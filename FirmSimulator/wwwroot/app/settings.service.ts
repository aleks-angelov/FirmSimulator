import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Settings } from "./settings"
import { HelperService } from "./helper.service";
import { UsersService } from "./users.service";

@Injectable()
export class SettingsService {
    private settingsUrl = "api/settings"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService,
        private usersService: UsersService) {
    }

    getAllSettings(): Observable<Settings[]> {
        return (this.http.get(this.settingsUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Settings[]>;
    }

    getUserSettings(userEmail: string): Observable<Settings[]> {
        return (this.http.get(this.settingsUrl + "/?user=${userEmail}")
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Settings[]>;
    }

    postSettings(set: Settings): Observable<boolean> {
        set.settingsId = -1;
        set.userEmail = this.usersService.getCurrentUser().email;

        const body = JSON.stringify(set);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        return (this.http.post(this.settingsUrl, body, options)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<boolean>;
    }
}