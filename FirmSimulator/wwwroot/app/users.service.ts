import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { LoginViewModel } from "./login-view-model"
import { User } from "./user"

import { HelperService } from "./helper.service";

@Injectable()
export class UsersService {
    private usersUrl = "api/users"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }


}