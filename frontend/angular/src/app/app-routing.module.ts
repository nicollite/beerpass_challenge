import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { LoginComponent } from "./screens/login/login.component";
import { HomeComponent } from "./screens/home/home.component";

// Resolvers
import { AuthResolver } from "./guards/auth.resolver";
import { LoggedGuard } from "./guards/logged.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    resolve: { auth: AuthResolver },
    canActivate: [LoggedGuard],
    canActivateChild: [LoggedGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "chopp",
      },
      {
        path: "chopp",
        loadChildren: () => import("./chopp/chopp.module").then(m => m.ChoppModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
