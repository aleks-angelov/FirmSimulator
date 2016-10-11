import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { LoginViewModel } from "./user-view-models";
import { RegisterViewModel } from "./user-view-models";
import { User } from "./user";
import { UsersService } from "./users.service";

@Component({
    selector: "my-users",
    templateUrl: "app/users.component.html"
})
export class UsersComponent implements OnInit {
    errorMessage: string;
    users: User[];
    existingUser = new LoginViewModel;
    newUser = new RegisterViewModel;
    active = true;

    constructor(
        private titleService: Title,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Users - Firm Simulator");
        this.getAllUsers();
    }

    getAllUsers() {
        this.usersService.getAllUsers()
            .subscribe(
            response => this.users = response,
            error => this.errorMessage = (error as any));
    }

    registerUser() {
        
    }
}