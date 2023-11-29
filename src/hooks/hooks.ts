import { Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { fixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

// It will trigger for not auth scenarios
Before(async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    fixture.page = page;
});