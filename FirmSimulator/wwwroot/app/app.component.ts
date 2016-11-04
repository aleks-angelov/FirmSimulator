import { Component, DoCheck } from "@angular/core";

import { UsersService } from "./users.service";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent implements DoCheck {
    private loggedIn = false;

    constructor(
        private usersService: UsersService) {
    }

    ngDoCheck(): void {
        this.loggedIn = this.usersService.isLoggedIn();
    }

    logOut(): void {
        this.usersService.logOut();
    }
}