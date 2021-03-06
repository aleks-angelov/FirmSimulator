﻿import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Score } from "./score-model";

import { HelperService } from "../shared/helper.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class ScoresService {
    private scoresUrl = "api/scores"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService,
        private usersService: UsersService) {
    }

    getScores(): Observable<Score[]> {
        return (this.http.get(this.scoresUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Score[]>;
    }

    postScore(sc: Score): Observable<void> {
        sc.userEmail = this.usersService.currentUser.email;

        const body = JSON.stringify(sc);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        return (this.http.post(this.scoresUrl, body, options)
            .catch(this.helperService.handleError)) as Observable<void>;
    }
}
