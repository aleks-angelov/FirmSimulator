"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var user_view_models_1 = require("./user-view-models");
var users_service_1 = require("./users.service");
var UsersComponent = (function () {
    function UsersComponent(titleService, router, usersService) {
        this.titleService = titleService;
        this.router = router;
        this.usersService = usersService;
        this.loginModel = new user_view_models_1.LoginViewModel();
        this.loginFailed = false;
        this.registerModel = new user_view_models_1.RegisterViewModel();
        this.confirmFailed = false;
        this.registerFailed = false;
        this.loginFormErrors = {
            'loginEmail': "",
            'loginPassword': ""
        };
        this.loginValidationMessages = {
            'loginEmail': {
                'required': "E-mail is required."
            },
            'loginPassword': {
                'required': "Password is required.",
                'minlength': "Password must be at least 6 characters long."
            }
        };
        this.registerFormErrors = {
            'registerEmail': "",
            'registerName': "",
            'registerPassword': "",
            'registerConfirmPassword': ""
        };
        this.registerValidationMessages = {
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
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Users - Firm Simulator");
    };
    UsersComponent.prototype.ngAfterViewChecked = function () {
        this.loginFormChanged();
        this.registerFormChanged();
    };
    UsersComponent.prototype.loginFormChanged = function () {
        var _this = this;
        if (this.currentLoginForm === this.loginForm) {
            return;
        }
        this.loginForm = this.currentLoginForm;
        if (this.loginForm) {
            this.loginForm.valueChanges
                .subscribe(function (data) { return _this.onLoginValueChanged(data); });
        }
    };
    UsersComponent.prototype.onLoginValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm.form;
        for (var field in this.loginFormErrors) {
            // clear previous error message (if any)
            this.loginFormErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.loginValidationMessages[field];
                for (var key in control.errors) {
                    this.loginFormErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    UsersComponent.prototype.loginUser = function (lvm) {
        var _this = this;
        this.usersService.loginUser(lvm)
            .subscribe(function (response) {
            if (response.email != null) {
                _this.loginFailed = false;
                _this.usersService.setCurrentUser(response);
                var redirect = _this.usersService.getRedirectUrl() || "/home";
                _this.router.navigate([redirect]);
            }
            else
                _this.loginFailed = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    UsersComponent.prototype.registerFormChanged = function () {
        var _this = this;
        if (this.currentRegisterForm === this.registerForm) {
            return;
        }
        this.registerForm = this.currentRegisterForm;
        if (this.registerForm) {
            this.registerForm.valueChanges
                .subscribe(function (data) { return _this.onRegisterValueChanged(data); });
        }
    };
    UsersComponent.prototype.onRegisterValueChanged = function (data) {
        if (!this.registerForm) {
            return;
        }
        var form = this.registerForm.form;
        if (this.registerModel.password !== this.registerModel.confirmPassword)
            this.confirmFailed = true;
        else
            this.confirmFailed = false;
        for (var field in this.registerFormErrors) {
            // clear previous error message (if any)
            this.registerFormErrors[field] = "";
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.registerValidationMessages[field];
                for (var key in control.errors) {
                    this.registerFormErrors[field] += messages[key] + " ";
                }
            }
        }
    };
    UsersComponent.prototype.registerUser = function (rvm) {
        var _this = this;
        this.usersService.registerUser(rvm)
            .subscribe(function (response) {
            if (response.email != null) {
                _this.registerFailed = false;
                _this.usersService.setCurrentUser(response);
                var redirect = _this.usersService.getRedirectUrl() || "/home";
                _this.router.navigate([redirect]);
            }
            else
                _this.registerFailed = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.ViewChild("loginForm"), 
        __metadata('design:type', forms_1.NgForm)
    ], UsersComponent.prototype, "currentLoginForm", void 0);
    __decorate([
        core_1.ViewChild("registerForm"), 
        __metadata('design:type', forms_1.NgForm)
    ], UsersComponent.prototype, "currentRegisterForm", void 0);
    UsersComponent = __decorate([
        core_1.Component({
            selector: "sg-users",
            templateUrl: "app/users/users.component.html"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, users_service_1.UsersService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map