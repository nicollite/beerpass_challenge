import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoggedGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService) {}

  canActivate(): Promise<boolean> {
    return this.auth.persitentLogin();
  }
  canActivateChild(): Observable<boolean> | Promise<boolean> {
    return this.canActivate();
  }
}
