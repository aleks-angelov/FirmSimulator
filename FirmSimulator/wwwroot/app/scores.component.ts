import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Score } from "./score";
import { ScoresService } from "./scores.service";
import { UsersService } from "./users.service";

@Component({
    selector: "my-scores",
    templateUrl: "app/scores.component.html"
})
export class ScoresComponent implements OnInit {
    errorMessage: string;
    allScores: Score[];
    filteredScores: Score[];
    filterScores = true;

    constructor(
        private titleService: Title,
        private scoresService: ScoresService,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Scores - Firm Simulator");
        this.getScores();
    }

    getScores() {
        this.scoresService.getScores()
            .subscribe(
                response => {
                    this.allScores = response;
                    const currentEmail = this.usersService.getCurrentUser().email;
                    this.filteredScores = new Array<Score>();
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].userEmail === currentEmail)
                            this.filteredScores.push(response[i]);
                    }
                },
                error => this.errorMessage = (error as any));
    }

    setFilter() {
        this.filterScores = !this.filterScores;
    }

    postScore(sc: Score) {
        this.scoresService.postScore(sc)
            .subscribe(
                response => {
                    if (response === true) {
                        this.getScores();
                    }
                },
                error => this.errorMessage = (error as any));
    }
}