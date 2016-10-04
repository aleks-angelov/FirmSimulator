import { Component, OnInit } from "@angular/core";

import { LoginViewModel } from "./login-view-model";

@Component({
    selector: "my-login",
    templateUrl: "app/login.component.html"
})
export class LoginComponent implements OnInit {
    loginModel: LoginViewModel;

    ngOnInit() {

    }
}