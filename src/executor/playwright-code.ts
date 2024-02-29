import { Command, Scenario, Step } from "../interface";
import { JavaScriptFormatter } from '../lib/javascript';
import locatorJSON from "../../config/locator.json";
import fs from 'fs';
import path from 'path';

export class PlayWrightCodeExecutor {
    private scenarios: Scenario[];
    constructor(scenarios: Scenario[]) {
        this.scenarios = scenarios;
    }
    async start() {
        const result = this.generateTest(this.scenarios);
        fs.writeFileSync(path.resolve(__dirname, '../../dist/test.spec.ts'), result, 'utf-8');
    }

    private generateTestHeader(testName: string) {
        const formatter = new JavaScriptFormatter();
        formatter.add(`
      test('${testName}', async ({ page }) => {`);
        return formatter.format();
    }

    private generateTestFooter() {
        return `});`;
    }

    private generateTest(scenarios: Scenario[]) {
        const importText = `import { test, expect } from '@playwright/test';`;
        const footer = this.generateTestFooter();
        const scenarioText = scenarios.map((scenario, index) => {
            const header = this.generateTestHeader(scenario.name);
            const step = scenario.steps.map(step => this.generateStep(step)).filter(str => !!str).join('\n');
            return [header, step, footer].join('\n');
        }).join('\n\n');
        const formatter = new JavaScriptFormatter()
        formatter.add([importText, scenarioText].join('\n'));

        return formatter.format();
    }

    private generateStep(step: Step) {
        const nameByAlias: Record<string, string> = {
            "回车": "Enter",
        }
        const handlerByCommend: Partial<Record<Command, string>> = {
            [Command.Jump]: `await page.goto("${String(step.params[0])}");`,
            [Command.InputText]: `await ${this.locator(String(step.params[0]))}.fill("${String(step.params[1])}");`,
            [Command.Press]: `await ${this.locator(String(step.params[0]))}.press("${nameByAlias[String(step.params[1])]}");`,
            [Command.ElementTextIs]: `await expect(${this.locator(String(step.params[0]))}).toHaveText("${String(step.params[1])}");`,
            [Command.ClickText]: `await page.getByText("${String(step.params[0])}").click();`,
            [Command.ClickElement]: `await ${this.locator(String(step.params[0]))}.click();`,
            [Command.ExistElement]: `await expect(${this.locator(String(step.params[0]))}).toBeVisible();`,
            [Command.ElementTextContain]: `await expect(${this.locator(String(step.params[0]))}).toContainText("${String(step.params[1])}");`,
        }
        return handlerByCommend[step.command];
    }

    private locator(str: string) {
        const temp = locatorJSON[str];
        return `page.locator("${temp ?? str}")`
    }
}