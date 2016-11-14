import { UserViewModel } from "../users/user-view-models";

export class Score {
    scoreId: number;
    date: Date;
    totalProfit: number;
    profitMaximization: number;

    userEmail: string;
    settingsDescription: string;
}