import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { UsersService } from "./users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersService: UsersService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;

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