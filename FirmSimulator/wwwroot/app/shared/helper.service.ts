﻿import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class HelperService {
    extractData(res: Response): any {
        const body = res.json();
        if (body === null) {
            return [];
        }
        return body;
    }

    handleError(error: any) {
        const errMsg = (error.message)
            ? error.message
            : error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
