import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Score } from "./score";
import { Settings } from "./settings";

import { HelperService } from "./helper.service";
import { ScoresService } from "./scores.service";
import { UsersService } from "./users.service";

@Injectable()
export class SimulationService {
    private currentSettings: Settings = null;

    constructor(
        private helperService: HelperService,
        private scoreService: ScoresService,
        private usersService: UsersService) {
    }

    getCurrentSettings(): Settings {
        return this.currentSettings;
    }

    beginSimulation(initialSettings: Settings) {
        this.currentSettings = initialSettings;
    }

    isSimulationRunning(): boolean {
        return this.currentSettings != null;
    }

    makeTurn() {

    }

    endSimulation() {
        let score = new Score();

        this.scoreService.postScore(score);
    }
}