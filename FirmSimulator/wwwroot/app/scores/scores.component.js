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
var platform_browser_1 = require("@angular/platform-browser");
var scores_service_1 = require("./scores.service");
var users_service_1 = require("../users/users.service");
var ScoresComponent = (function () {
    function ScoresComponent(titleService, scoresService, usersService) {
        this.titleService = titleService;
        this.scoresService = scoresService;
        this.usersService = usersService;
        this.filterScores = true;
    }
    ScoresComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Scores - Firm Simulator");
        this.getScores();
    };
    ScoresComponent.prototype.setFilter = function () {
        this.filterScores = !this.filterScores;
    };
    ScoresComponent.prototype.getScores = function () {
        var _this = this;
        this.scoresService.getScores()
            .subscribe(function (response) {
            _this.allScores = response;
            var currentEmail = _this.usersService.currentUser.email;
            _this.filteredScores = [];
            for (var i = 0; i < response.length; i++) {
                if (response[i].userEmail === currentEmail)
                    _this.filteredScores.push(response[i]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    ScoresComponent = __decorate([
        core_1.Component({
            selector: "sg-scores",
            templateUrl: "app/scores/scores.component.html"
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, scores_service_1.ScoresService, users_service_1.UsersService])
    ], ScoresComponent);
    return ScoresComponent;
}());
exports.ScoresComponent = ScoresComponent;
//# sourceMappingURL=scores.component.js.map