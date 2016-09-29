import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Score } from "./score";
import { ScoresService } from "./scores.service";

@Component({
    selector: "my-scores",
    templateUrl: "app/scores.component.html"
})
export class ScoresComponent implements OnInit {
    errorMessage: string;
    scores: Score[];

    constructor(
        private titleService: Title,
        private scoreService: ScoresService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Scores - Firm Simulator");
        this.getAllScores();
    }

    getAllScores() {
        this.scoreService.getAllScores()
            .subscribe(
                response => this.scores = response,
                error => this.errorMessage = (error as any));
    }
}