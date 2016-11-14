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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var helper_service_1 = require("../shared/helper.service");
var users_service_1 = require("../users/users.service");
var SettingsService = (function () {
    function SettingsService(http, helperService, usersService) {
        this.http = http;
        this.helperService = helperService;
        this.usersService = usersService;
        this.settingsUrl = "api/settings"; // URL to web api
    }
    SettingsService.prototype.getSettings = function () {
        return (this.http.get(this.settingsUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError));
    };
    SettingsService.prototype.postSettings = function (set) {
        set.userEmail = this.usersService.getCurrentUser().email;
        var body = JSON.stringify(set);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        return (this.http.post(this.settingsUrl, body, options)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError));
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, helper_service_1.HelperService, users_service_1.UsersService])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map