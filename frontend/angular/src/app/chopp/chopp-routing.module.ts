import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChoppComponent } from "./chopp.component";

const routes: Routes = [{ path: "", component: ChoppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoppRoutingModule {}
