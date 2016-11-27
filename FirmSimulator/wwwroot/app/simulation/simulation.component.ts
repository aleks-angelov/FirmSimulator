import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "sg-simulation",
    templateUrl: "app/simulation/simulation.component.html"
})
export class SimulationComponent implements OnInit {
    private currentTab = 1;

    constructor(
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Simulation - Firm Simulator");
    }

    changeTab(): void {
        this.currentTab++;
        if (this.currentTab > 2) {
            this.currentTab = 0;
        }
    }
}
