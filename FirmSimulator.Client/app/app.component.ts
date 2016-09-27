/// <reference path="../../FirmSimulator.Client/typings/globals/jquery/index.d.ts" />
/// <reference path="../../FirmSimulator.Client/typings/globals/jqueryui/index.d.ts" />

import { Component, AfterViewInit } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        $("#date").datepicker({ dateFormat: "dd/mm/yy" });
        $("#date").datepicker("setDate", new Date());
    }
}