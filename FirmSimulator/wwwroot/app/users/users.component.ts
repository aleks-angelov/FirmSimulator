import { Component, OnInit, AfterViewChecked, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { LoginViewModel, RegisterViewModel, UserViewModel } from "./user-view-models";

import { UsersService } from "./users.service";

@Component({
    selector: "sg-users",
    templateUrl: "app/users/users.component.html"
})
export class UsersComponent implements OnInit, AfterViewChecked {
    private errorMessage: string;

    private loginForm: NgForm;
    @ViewChild("loginForm") currentLoginForm: NgForm;

    private loginModel = new LoginViewModel();
    private loginFailed = false;

    private registerForm: NgForm;
    @ViewChild("registerForm") currentRegisterForm: NgForm;

    private registerModel = new RegisterViewModel();
    private confirmFailed = false;
    private registerFailed = false;

    constructor(
        private titleService: Title,
        private router: Router,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Users - Firm Simulator");
    }

    ngAfterViewChecked(): void {
        this.loginFormChanged();
        this.registerFormChanged();
    }

    loginFormChanged(): void {
        if (this.currentLoginForm === this.loginForm) {
            return;
        }
        this.loginForm = this.currentLoginForm;
        if (this.loginForm) {
            this.loginForm.valueChanges
                .subscribe(data => this.onLoginValueChanged(data));
        }
    }

    onLoginValueChanged(data?: any): void {
        if (!this.loginForm) {
            return;
        }
        const form = this.loginForm.form;

        for (const field in this.loginFormErrors) {
            // clear previous error message (if any)
            this.loginFormErrors[field] = "";
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.loginValidationMessages[field];
                for (const key in control.errors) {
                    this.loginFormErrors[field] += messages[key] + " ";
                }
            }
        }
    }

    loginFormErrors = {
        'loginEmail': "",
        'loginPassword': ""
    };

    loginValidationMessages = {
        'loginEmail': {
            'required': "E-mail is required."
        },
        'loginPassword': {
            'required': "Password is required.",
            'minlength': "Password must be at least 6 characters long."
        }
    };

    loginUser(lvm: LoginViewModel): void {
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

    registerFormChanged(): void {
        if (this.currentRegisterForm === this.registerForm) {
            return;
        }
        this.registerForm = this.currentRegisterForm;
        if (this.registerForm) {
            this.registerForm.valueChanges
                .subscribe(data => this.onRegisterValueChanged(data));
        }
    }

    onRegisterValueChanged(data?: any): void {
        if (!this.registerForm) {
            return;
        }
        const form = this.registerForm.form;

        if (this.registerModel.password !== this.registerModel.confirmPassword)
            this.confirmFailed = true;
        else
            this.confirmFailed = false;

        for (const field in this.registerFormErrors) {
            // clear previous error message (if any)
            this.registerFormErrors[field] = "";
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.registerValidationMessages[field];
                for (const key in control.errors) {
                    this.registerFormErrors[field] += messages[key] + " ";
                }
            }
        }
    }

    registerFormErrors = {
        'registerEmail': "",
        'registerName': "",
        'registerPassword': "",
        'registerConfirmPassword': ""
    };

    registerValidationMessages = {
        'registerEmail': {
            'required': "E-mail is required."
        },
        'registerName': {
            'required': "Name is required."
        },
        'registerPassword': {
            'required': "Password is required.",
            'minlength': "Password must be at least 6 characters long."
        },
        'registerConfirmPassword': {
            'required': "Confirm password is required.",
            'minlength': "Confirm password must be at least 6 characters long."
        }
    };

    registerUser(rvm: RegisterViewModel): void {
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