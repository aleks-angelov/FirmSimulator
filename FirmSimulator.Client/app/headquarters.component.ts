import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "my-headquarters",
    templateUrl: "app/headquarters.component.html"
})
export class HeadquartersComponent implements OnInit {
    constructor(
        private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle("Headquarters - Firm Simulator");
    }
}