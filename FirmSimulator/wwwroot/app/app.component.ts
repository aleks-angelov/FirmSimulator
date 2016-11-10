import { Component, DoCheck } from "@angular/core";
import { Router } from "@angular/router";

import { UsersService } from "./users.service";

@Component({
    selector: "sg-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent implements DoCheck {
    path = "";

    private loggedIn = false;

    constructor(
        private router: Router,
        private usersService: UsersService) {
        router.events.subscribe(() => {
            this.path = router.url;
        });
    }

    ngDoCheck(): void {
        this.loggedIn = this.usersService.isLoggedIn();
    }

    logOut(): void {
        this.usersService.logOut();
    }
}

// Codelyzer: .\node_modules\.bin\tslint -c tslint.json .\wwwroot\app\*.ts