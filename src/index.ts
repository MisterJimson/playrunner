#!/usr/bin/env node

import { chromium } from "playwright";
import fs from "fs";
import {
  clickOn,
  expectTitle,
  goTo,
  expectUrl,
  expectAttribute,
} from "./commands";

import { Command } from "commander";
import yaml from "js-yaml";
import { hasOwnProperty } from "./yaml-helpers";

const program = new Command();

program
  .version("0.0.1")
  .description("Run playwright tests from simple yaml flows");

program
  .command("run")
  .description("Run a flow")
  .argument("<string>", "Flow file")
  .action(async (str: string, options: Record<string, string>) => {
    const file = fs.readFileSync(process.cwd() + "/" + str, "utf8");

    // Load the flow from yaml into a javascript object using js-yaml
    let data = yaml.load(file);

    // Start the browser and create a new page
    const browser = await chromium.launch({
      headless: false,
    }); // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();

    const steps = data as Object[];

    // Loop through the flow and execute the commands
    for (const step of steps) {
      if (hasOwnProperty(step, "description")) {
        console.log(step.description);
      } else if (hasOwnProperty(step, "goTo")) {
        await goTo(page, step.goTo);
      } else if (hasOwnProperty(step, "expectTitle")) {
        await expectTitle(page, step.expectTitle);
      } else if (hasOwnProperty(step, "clickOn")) {
        await clickOn(page, step.clickOn);
      } else if (hasOwnProperty(step, "expectUrl")) {
        await expectUrl(page, step.expectUrl);
      } else if (hasOwnProperty(step, "expectAttribute")) {
        await expectAttribute(page, step.expectAttribute);
      } else {
        console.log(`Unknown step: ${step}`);
      }
    }
    await browser.close();
    console.log("Flow successfully completed");
  });

program.parse();
