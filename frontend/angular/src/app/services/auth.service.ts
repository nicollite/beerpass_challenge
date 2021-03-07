import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "shared";
import { filter, take, map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

/** Object for login */
export interface LoginOptions {
  email: string;
  password: string;
}

/** Jwt for refreshing token with backend */
export interface AuthJwt {
  /** JWT Token generated from firebade authenricator */
  token: string;

  /** The timestamp of the token generation */
  timestamp: number;

  /** Time in millisecond for the token to expire */
  expiration: number;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  /** Path for the users collection */
  private readonly userCollection = this.afs.collection("users");

  private auth: AngularFireAuth & firebase.auth.Auth;

  /** Subject that emits the user data  */
  private userSub = new BehaviorSubject<User>(null);

  /** Observable that emits the user data */
  user$: Observable<User>;

  /** The logged user data */
  private user: User;

  /** Authenticator User object */
  private authUser: firebase.User;

  /** JsonWebToken used for requests in API */
  private jwt: AuthJwt;

  /** Time in milliseconds for expiration of this JWT */
  private jwtExpiration: number = 3550 * 1000;

  /** The logged user uid, if no logged user an empty string "" */
  get uid(): string {
    if (this.authUser) return this.authUser.uid;
    return "";
  }

  /** The logged user email, if no logged user an empty string "" */
  get email(): string {
    if (this.authUser) return this.authUser.email;
    return "";
  }

  constructor(_auth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.auth = _auth as AngularFireAuth & firebase.auth.Auth;

    this.auth.authState.subscribe(user => this.persitentLogin(user));

    this.user$ = this.userSub
      // Filter value to emit user only
      .pipe(filter(user => (user ? true : false)));

    this.jwt = {
      token: "",
      expiration: this.jwtExpiration,
      timestamp: 0,
    };
  }

  /** Login in the portal with email and password */
  async login(options: LoginOptions): Promise<void> {
    const { email, password } = options;
    await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(credentials => (this.authUser = credentials.user as firebase.User))
      .catch(err => {
        console.log("Error on login!");
        console.log(err);
        throw err;
      });

    // Set data in class after login
    await this.setAfterSign();

    // Navigate to home just if is a new login
    await this.router.navigate(["home"]);
  }

  async persitentLogin(authUser?: firebase.User): Promise<boolean> {
    if (this.authUser) return true;
    this.authUser = authUser || (await this.auth.authState.pipe(take(1)).toPromise());
    if (!this.authUser) return this.signOut();

    await this.setAfterSign();
    return true;
  }

  /** Generates a new token for this class */
  async generateJWT() {
    this.jwt = {
      token: await this.authUser.getIdToken(true),
      timestamp: Date.now(),
      expiration: this.jwtExpiration,
    };
  }

  /** Sign out of authenticator */
  signOut() {
    // Logout services
    this.auth.signOut();

    // Unset properties
    this.authUser = undefined;
    this.user = undefined;
    this.userSub.next(null);

    this.router.navigate(["login"]);
    return false;
  }

  /** Gets the user data firestore, if the user don't exists or is inactive sign out */
  private async getUserInFirestore(uid: string): Promise<boolean> {
    const docSnap = await this.userCollection.doc<User>(uid).get().toPromise();

    if (!docSnap.exists) return this.signOut();

    this.user = docSnap.data() as User;
    return true;
  }

  /** Sets persistence in authenticator and generate the JWT */
  private async setAfterSign() {
    // Check if the login will continue
    const userExists = await this.getUserInFirestore(this.uid);
    if (!userExists) {
      console.error(new Error("user not found"));
      // Todo add validation in frontend
      return;
    }

    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.auth.setPersistence;
    // Generate a jwt token
    await this.generateJWT();

    // Set user observable
    this.userCollection
      .doc<User>(this.uid)
      .valueChanges()
      .subscribe(user => {
        this.user = user;
        // Emit user data
        this.userSub.next(this.user);
      });
  }
}
