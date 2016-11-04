import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { LoginViewModel } from "./user-view-models";
import { RegisterViewModel } from "./user-view-models";
import { UserViewModel } from "./user-view-models";

import { UsersService } from "./users.service";

@Component({
    selector: "my-users",
    templateUrl: "app/users.component.html"
})
export class UsersComponent implements OnInit {
    private errorMessage: string;
    private loginModel = new LoginViewModel();
    private loginFailed = false;
    private registerModel = new RegisterViewModel();
    private registerFailed = false;

    constructor(
        private titleService: Title,
        private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Users - Firm Simulator");
    }

    loginUser(lvm: LoginViewModel): void {
        this.usersService.loginUser(lvm)
            .subscribe(
                response => {
                    if (response.email != null) {
                        this.loginFailed = false;
                        this.usersService.setCurrentUser(response);
                        const redirect = this.usersService.getRedirectUrl() || "/home";
                        this.router.navigate([redirect]);
                    } else this.loginFailed = true;
                },
                error => this.errorMessage = (error as any));
    }

    registerUser(rvm: RegisterViewModel): void {
        this.usersService.registerUser(rvm)
            .subscribe(
                response => {
                    if (response.email != null) {
                        this.registerFailed = false;
                        this.usersService.setCurrentUser(response);
                        const redirect = this.usersService.getRedirectUrl() || "/home";
                        this.router.navigate([redirect]);
                    } else this.registerFailed = true;
                },
                error => this.errorMessage = (error as any));
    }
}