import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { Chopp } from "shared";
import { ChoppService } from "./chopp.service";

@Component({
  selector: "app-chopp",
  templateUrl: "./chopp.component.html",
  styleUrls: ["./chopp.component.scss"],
})
export class ChoppComponent implements OnInit {
  constructor(public choppService: ChoppService) {}

  ngOnInit(): void {}
}
