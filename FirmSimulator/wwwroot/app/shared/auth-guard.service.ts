import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { SimulationService } from "../simulation/simulation.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private simulationService: SimulationService,
        private usersService: UsersService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;

        if (url === "/simulation" && !this.simulationService.isSimulationRunning())
            return this.checkLogin("/introduction");

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.usersService.isLoggedIn()) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.usersService.setRedirectUrl(url);

        // Navigate to the login page with extras
        this.router.navigate(["/users"]);
        return false;
    }
}