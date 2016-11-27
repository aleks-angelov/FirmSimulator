import { Component, DoCheck } from "@angular/core";
import { Router } from "@angular/router";

import { SimulationService } from "./simulation/simulation.service";
import { UsersService } from "./users/users.service";

@Component({
    selector: "sg-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent implements DoCheck {
    path = "";

    private loggedIn = false;

    constructor(
        private router: Router,
        private simulationService: SimulationService,
        private usersService: UsersService) {
        router.events.subscribe(() => {
            this.path = router.url;
        });
    }

    ngDoCheck(): void {
        this.loggedIn = this.usersService.isLoggedIn();
    }

    logOut(): void {
        if (!this.simulationService.simulationRunning) {
            this.usersService.logOut();
        }
    }
}
