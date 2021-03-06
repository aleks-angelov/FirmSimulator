﻿import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Score } from "./score-model";

import { ScoresService } from "./scores.service";
import { UsersService } from "../users/users.service";

@Component({
    moduleId: module.id,
    selector: "sg-scores",
    templateUrl: "scores.component.html"
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
            (response: any) => {
                this.allScores = response;
                const currentEmail = this.usersService.currentUser.email;
                this.filteredScores = [];
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userEmail === currentEmail) {
                        this.filteredScores.push(response[i]);
                    }
                }
            },
            error => this.errorMessage = (error as any));
    }
}
