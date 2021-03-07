import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Chopp } from "shared";

@Injectable({
  providedIn: "root",
})
export class ChoppService {
  private choppsCollection = this.afs.collection<Chopp>("chopps");

  chopps$: Observable<Chopp[]>;

  constructor(private afs: AngularFirestore) {
    this.chopps$ = this.choppsCollection.valueChanges();
  }
}
