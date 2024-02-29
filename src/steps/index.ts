import { Given, When, Then, After, AfterAll, Before } from "@cucumber/cucumber";
import { Command, Scenario } from "../interface";
import { PlayWrightExecutor } from "../executor/playwright";
import { PlayWrightCodeExecutor } from "../executor/playwright-code";
const scenarios: Scenario[] = [];


let scenario: Scenario | null = null;
Before(function (params) {
  // 开启page
  scenario = {
    name: params.pickle.name,
    steps: [],
  }
});

After(function () {
  if (scenario) {
    scenarios.push(scenario);
    // 关闭page
    scenario = null;
  }
});

AfterAll({ timeout: 60 * 1000 }, async function () {
  const executor = process.env['executor']
  if (executor === 'code') {
    await new PlayWrightCodeExecutor(scenarios).start();
  } else {
    await new PlayWrightExecutor(scenarios).start();
  }
});


export enum StepName {
  Given = 'Given',
  When = 'When',
  Then = 'Then',
}

Given('跳转到[{string}]', function (url: string) {
  scenario?.steps.push({
    command: Command.Jump,
    params: [url],
  })
})

When('等待[{int}]秒', function (time: string) {
  scenario?.steps.push({
    command: Command.Wait,
    params: [time],
  })
})

When('点击元素[{string}]', function (locator: string) {
  scenario?.steps.push({
    command: Command.ClickElement,
    params: [locator],
  })
})
When('点击文案[{string}]', function (text: string) {
  scenario?.steps.push({
    command: Command.ClickText,
    params: [text],
  })
})
When('点击位置[{int}, {int}]', function (x: string, y: string) {
  scenario?.steps.push({
    command: Command.ClickPosition,
    params: [x, y],
  })
})

When('在[{string}]中输入[{string}]', function (locator: string, text: string) {
  scenario?.steps.push({
    command: Command.InputText,
    params: [locator, text],
  });

})

When('在[{string}]按下[{string}]', function (locator: string, key: string) {
  scenario?.steps.push({
    command: Command.Press,
    params: [locator, key],
  })
})

Then('存在元素[{string}]', function (locator: string) {
  scenario?.steps.push({
    command: Command.ExistElement,
    params: [locator],
  })
})

Then('存在[{string}]的文案', function (text: string) {
  scenario?.steps.push({
    command: Command.ExistText,
    params: [text],
  })
})

Then('[{string}]的文案是[{string}]', function (locator: string, text: string) {
  scenario?.steps.push({
    command: Command.ElementTextIs,
    params: [locator, text],
  })
})

Then('[{string}]的文案包含[{string}]', function (locator: string, text: string) {
  scenario?.steps.push({
    command: Command.ElementTextContain,
    params: [locator, text],
  })
})



