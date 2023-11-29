import { fixture } from "../hooks/pageFixture";
import { Command, Scenario } from "../interface";
import { expect } from '@playwright/test';


export class PlayWrightExecutor {
    private scenarios: Scenario[];
    constructor(scenarios: Scenario[]) {
        this.scenarios = scenarios;
    }
    async start() {
        const { page } = fixture;
        for (const scenario of this.scenarios) {
            for (const step of scenario.steps) {
                const handlerBy: Partial<Record<Command, () => Promise<void>>> = {
                    async [Command.Jump]() {
                        await page.goto(String(step.params[0]));
                    },
                    async [Command.InputText]() {
                        await (page.locator(String(step.params[0])))!.fill(String(step.params[1]))
                    },
                    async [Command.Press]() {
                        const nameByAlias: Record<string, string> = {
                            "回车": "Enter",
                        }
                        await (page.locator(String(step.params[0])))!.press(nameByAlias[String(step.params[1])]);
                    },
                    async [Command.ElementTextIs]() {
                        const selector = await page.$(String(step.params[0]));
                        const text = await selector!.innerText();
                        expect(text).toBe(String(step.params[1]));
                    }
                }

                await handlerBy![step.command]!();
            }
        }
    }
}