import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { SplineData } from "./chart-view-models";
import { HelperService } from "./helper.service";

@Injectable()
export class ChartService {
    private chartsUrl = "api/charts"; // URL to web api
    private chartsQuery = ""; // query for web api

    constructor(
        private http: Http,
        private helperService: HelperService) {
    }

    getSplineChartData(): Observable<SplineData> {
        this.chartsQuery = "/1";

        return (this.http.get(this.chartsUrl + this.chartsQuery)
            .map(this.helperService.extractData)
            .catch(this.helperService.handleError)) as Observable<SplineData>;
    }
}