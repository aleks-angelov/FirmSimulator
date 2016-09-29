import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Settings } from "./settings"
import { HelperService } from "./helper.service";

@Injectable()
export class SettingsService {
    private settingsUrl = "api/settings"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }

    getAllSettings(): Observable<Settings[]> {
        return (this.http.get(this.settingsUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Settings[]>;
    }

    getSettings(settingsId: number): Observable<Settings> {
        return (this.http.get(this.settingsUrl + settingsId.toString())
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Settings>;
    }
}