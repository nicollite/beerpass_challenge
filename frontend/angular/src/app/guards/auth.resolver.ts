import { Injectable } from "@angular/core";
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private auth: AuthService) {}

  resolve(): Promise<boolean> {
    return this.auth.persitentLogin();
  }
}
