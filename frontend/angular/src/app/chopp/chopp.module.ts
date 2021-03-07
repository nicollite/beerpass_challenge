import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChoppRoutingModule } from "./chopp-routing.module";
import { ChoppMaterialModule } from "./chopp-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChoppComponent } from "./chopp.component";

@NgModule({
  declarations: [ChoppComponent],
  imports: [CommonModule, ChoppMaterialModule, FlexLayoutModule, ChoppRoutingModule],
})
export class ChoppModule {}
