import { Component } from "@angular/core";

import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-indicators",
    templateUrl: "app/indicators.component.html"
})
export class IndicatorsComponent {
    constructor(
        private simulationService: SimulationService) {
    }
}