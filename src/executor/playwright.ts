import { fixture } from "../hooks/pageFixture";
import { Command, Scenario } from "../interface";
import locatorJSON from "../../config/locator.json";
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
                    [Command.Jump]: async () => {
                        await page.goto(String(step.params[0]));
                    },
                    [Command.InputText]: async () => {
                        await this.locator(String(step.params[0]))!.fill(String(step.params[1]))
                    },
                    [Command.Press]: async () => {
                        const nameByAlias: Record<string, string> = {
                            "回车": "Enter",
                        }
                        await this.locator(String(step.params[0]))!.press(nameByAlias[String(step.params[1])]);
                    },
                    [Command.ElementTextIs]: async () => {
                        await expect(this.locator(String(step.params[0]))).toHaveText(String(step.params[1]));
                    },
                    [Command.ClickText]: async () => {
                        await page.getByText(String(step.params[0])).click();
                    },
                    [Command.ClickElement]: async () => {
                        await this.locator(String(step.params[0])).click();
                    },
                    [Command.ExistElement]: async () => {
                        await expect(this.locator(String(step.params[0]))).toBeVisible();

                    },
                    [Command.ElementTextContain]: async () => {
                        await expect(this.locator(String(step.params[0]))).toContainText(String(step.params[1]));
                    }
                }
                await handlerBy![step.command]!();
            }
        }
    }
    locator(str: string) {
        const temp = locatorJSON[str];
        const { page } = fixture;
        return page.locator(temp ?? str);
    }
}