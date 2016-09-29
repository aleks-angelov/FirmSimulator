import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Score } from "./score"
import { HelperService } from "./helper.service";

@Injectable()
export class ScoresService {
    private scoresUrl = "api/scores"; // URL to web api

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }

    getAllScores(): Observable<Score[]> {
        return (this.http.get(this.scoresUrl)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Score[]>;
    }

    getScore(scoreId: number): Observable<Score> {
        return (this.http.get(this.scoresUrl + scoreId.toString())
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<Score>;
    }
}