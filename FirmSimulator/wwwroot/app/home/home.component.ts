import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: "sg-home",
    templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
    constructor(
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Home - Firm Simulator");
    }
}
