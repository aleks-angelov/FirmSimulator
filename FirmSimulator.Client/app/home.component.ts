/// <reference path="../../FirmSimulator.Client/typings/globals/jquery/index.d.ts" />
/// <reference path="../../FirmSimulator.Client/typings/globals/jqueryui/index.d.ts" />

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "my-home",
    templateUrl: "app/home.component.html"
})
export class HomeComponent implements OnInit, AfterViewInit {
    constructor(
        private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle("Home - Firm Simulator");
    }

    ngAfterViewInit(): void {
        $("#date").datepicker({ dateFormat: "dd/mm/yy", firstDay: 1 });
        $("#date").datepicker("setDate", new Date());
    }
}