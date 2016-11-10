import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "sg-home",
    templateUrl: "app/home.component.html"
})
export class HomeComponent implements OnInit, AfterViewInit {
    constructor(
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Home - Firm Simulator");
    }

    ngAfterViewInit(): void {
        $("#date").datepicker({ dateFormat: "dd/mm/yy", firstDay: 1 });
        $("#date").datepicker("setDate", new Date());
    }
}