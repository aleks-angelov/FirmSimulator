import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { LoginViewModel } from "./user-view-models";
import { RegisterViewModel } from "./user-view-models";
import { UserViewModel } from "./user-view-models";
import { UsersService } from "./users.service";

@Component({
    selector: "my-users",
    templateUrl: "app/users.component.html"
})
export class UsersComponent implements OnInit {
    errorMessage: string;
    loginModel = new LoginViewModel();
    loginFailed = false;
    registerModel = new RegisterViewModel();
    registerFailed = false;

    constructor(
        private titleService: Title,
        private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Users - Firm Simulator");
    }

    loginUser(lvm: LoginViewModel) {
        this.usersService.loginUser(lvm)
            .subscribe(
            response => {
                if (response.email != null) {
                    this.loginFailed = false;
                    this.usersService.setCurrentUser(response);
                    const redirect = this.usersService.redirectUrl || "/home";
                    this.router.navigate([redirect]);
                } else this.loginFailed = true;
            },
            error => this.errorMessage = (error as any));
    }

    registerUser(rvm: RegisterViewModel) {
        this.usersService.registerUser(rvm)
            .subscribe(
            response => {
                if (response.email != null) {
                    this.registerFailed = false;
                    this.usersService.setCurrentUser(response);
                    const redirect = this.usersService.redirectUrl || "/home";
                    this.router.navigate([redirect]);
                } else this.registerFailed = true;
            },
            error => this.errorMessage = (error as any));
    }
}