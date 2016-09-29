import { Score } from "./score";
import { Settings } from "./settings";

export class User {
    email: string;
    name: string;

    scores: Score[];
    settings: Settings[];
}