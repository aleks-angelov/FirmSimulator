import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "sg-home",
    templateUrl: "app/home/home.component.html"
})
export class HomeComponent implements OnInit {
    constructor(
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Home - Firm Simulator");
    }
}