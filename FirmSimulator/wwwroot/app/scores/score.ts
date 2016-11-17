import { UserViewModel } from "../users/user-view-models";

export class Score {
    scoreId: number;
    date: Date;
    startTime: Date;
    settingsDescription: string;
    duration: string;
    totalProfit: number;
    profitMaximization: number;

    userEmail: string;
}