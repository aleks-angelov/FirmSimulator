import { Component, DoCheck } from "@angular/core";

import { UsersService } from "./users.service";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent implements DoCheck {
    loggedIn = false;

    constructor(
        private usersService: UsersService) {
    }

    ngDoCheck() {
        this.loggedIn = this.usersService.loggedIn();
    }

    logOut() {
        this.usersService.logOut();
    }
}