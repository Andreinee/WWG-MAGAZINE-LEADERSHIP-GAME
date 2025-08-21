
export enum GameState {
    Start,
    Playing,
    Results,
    Leaderboard
}

export type QuestionType = "Quiz-Style" | "Scenario Match" | "Good Call / Bad Call";

export interface Question {
    type: QuestionType;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    scripture: string;
    application: string;
}

export interface PlayerScore {
    id: number;
    name: string;
    business: string;
    score: number;
}
