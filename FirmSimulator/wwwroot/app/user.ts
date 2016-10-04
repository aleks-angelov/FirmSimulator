import { Score } from "./score";
import { Settings } from "./settings";

export class User {
    email: string;
    name: string;
    passwordHash: string;

    scores: Score[];
    settings: Settings[];
}