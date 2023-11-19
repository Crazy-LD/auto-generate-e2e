import { Given, When, Then } from "@cucumber/cucumber";
import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

Given('跳转到{string}', async function (url) {
  chromium.launch({
    
  })
});



Scenario: 去百度
Given 跳转到https://demo.playwright.dev/todomvc
When 在[placeholder=What needs to be done?]中输入吃饭
When 按下回车
When [class=new-todo]的文案为吃饭