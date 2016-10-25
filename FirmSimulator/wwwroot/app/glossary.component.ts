import { Component } from "@angular/core";

import { SimulationService } from "./simulation.service";

@Component({
    selector: "my-glossary",
    templateUrl: "app/glossary.component.html"
})
export class GlossaryComponent {
    constructor(
        private simulationService: SimulationService) {
    }
}