import { Scenario } from "../interface";

export class PlayWrightCodeExecutor {
    private scenarios: Scenario[];
    constructor(scenarios: Scenario[]) {
        this.scenarios = scenarios;
    }
    async start() {
    }
}