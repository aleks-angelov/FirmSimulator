import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";

import { SimulationComponent } from "./simulation.component";
import { SimulationService } from "./simulation.service";

@Injectable()
export class ExitGuard implements CanDeactivate<SimulationComponent> {
    constructor(
        private simulationService: SimulationService) {
    }

    canDeactivate(component: SimulationComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.simulationService.simulationRunning) {
            if (window.confirm("If you leave the game before you complete it, you will lose your progress!")) {
                this.simulationService.leaveSimulation();
                return true;
            }
            return false;
        }
        return true;
    }
}