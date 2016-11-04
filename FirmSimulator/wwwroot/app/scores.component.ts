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
    private errorMessage: string;
    private allScores: Score[];
    private filteredScores: Score[];
    private filterScores = true;

    constructor(
        private titleService: Title,
        private scoresService: ScoresService,
        private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.titleService.setTitle("Scores - Firm Simulator");
        this.getScores();
    }

    setFilter(): void {
        this.filterScores = !this.filterScores;
    }

    getScores(): void {
        this.scoresService.getScores()
            .subscribe(
                response => {
                    this.allScores = response;
                    const currentEmail = this.usersService.getCurrentUser().email;
                    this.filteredScores = [];
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].userEmail === currentEmail)
                            this.filteredScores.push(response[i]);
                    }
                },
                error => this.errorMessage = (error as any));
    }

    postScore(sc: Score): void {
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