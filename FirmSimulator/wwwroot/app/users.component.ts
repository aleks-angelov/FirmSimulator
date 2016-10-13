import { Component, OnInit } from "@angular/core";
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
    errorMessage: string;
    loginModel = new LoginViewModel();
    registerModel = new RegisterViewModel();

    constructor(
        private titleService: Title,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Users - Firm Simulator");
    }

    loginUser(lvm: LoginViewModel) {
        this.usersService.loginUser(lvm)
            .subscribe(
            response => this.errorMessage = response.name,
            error => this.errorMessage = (error as any));
    }

    registerUser(rvm: RegisterViewModel) {
        this.usersService.registerUser(rvm)
            .subscribe(
            response => this.errorMessage = response.name,
            error => this.errorMessage = (error as any));
    }
}