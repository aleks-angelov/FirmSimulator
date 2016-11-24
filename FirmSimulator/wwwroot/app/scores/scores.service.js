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
var ScoresService = (function () {
    function ScoresService(http, helperService, usersService) {
        this.http = http;
        this.helperService = helperService;
        this.usersService = usersService;
        this.scoresUrl = "api/scores"; // URL to web api
    }
    ScoresService.prototype.getScores = function () {
        return (this.http.get(this.scoresUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError));
    };
    ScoresService.prototype.postScore = function (sc) {
        sc.userEmail = this.usersService.currentUser.email;
        var body = JSON.stringify(sc);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        return (this.http.post(this.scoresUrl, body, options)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError));
    };
    ScoresService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, helper_service_1.HelperService, users_service_1.UsersService])
    ], ScoresService);
    return ScoresService;
}());
exports.ScoresService = ScoresService;
//# sourceMappingURL=scores.service.js.map