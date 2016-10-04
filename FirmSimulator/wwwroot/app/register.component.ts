import { Component, OnInit } from "@angular/core";

import { User } from "./user";

@Component({
    selector: "my-register",
    templateUrl: "app/register.component.html"
})
export class RegisterComponent implements OnInit {
    newUser: User;

    ngOnInit() {

    }
}