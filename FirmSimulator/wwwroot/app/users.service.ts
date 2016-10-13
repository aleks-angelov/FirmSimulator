import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { LoginViewModel } from "./user-view-models";
import { RegisterViewModel } from "./user-view-models";
import { UserViewModel } from "./user-view-models";

import { HelperService } from "./helper.service";

@Injectable()
export class UsersService {
    private usersUrl = "api/users"; // URL to web api
    private currentUser: UserViewModel;

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }

    loginUser(lvm: LoginViewModel): Observable<UserViewModel> {
        const body = JSON.stringify(lvm);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        return (this.http.post(this.usersUrl + "/login", body, options)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<UserViewModel>;
    }

    registerUser(rvm: RegisterViewModel): Observable<UserViewModel> {
        const body = JSON.stringify(rvm);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        return (this.http.post(this.usersUrl + "/register", body, options)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<UserViewModel>;
    }

    getCurrentUser(): UserViewModel {
        return this.currentUser;
    }

    setCurrentUser(uvm: UserViewModel) {
        this.currentUser = uvm;
    }
}