import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { LoginViewModel } from "./user-view-models";
import { RegisterViewModel } from "./user-view-models";
import { User } from "./user";

import { HelperService } from "./helper.service";

@Injectable()
export class UsersService {
    private usersUrl = "api/users"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }

    getAllUsers(): Observable<User[]> {
        return (this.http.get(this.usersUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<User[]>;
    }

    getUser(userId: string): Observable<User> {
        return (this.http.get(this.usersUrl + userId)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<User>;
    }
}