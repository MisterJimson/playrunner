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

    // @ts-ignore TODO
    if (!data.description) {
      throw new Error("Flow must have a top level description:");
    }

    // @ts-ignore TODO
    if (!data.flow) {
      throw new Error("Flow must have a top level flow:");
    }

    // @ts-ignore TODO
    console.log(`Running flow: ${data.description}`);

    // Start the browser and create a new page
    const browser = await chromium.launch({
      headless: false,
    }); // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();

    // Loop through the flow and execute the commands
    // @ts-ignore TODO
    for (const [key, value] of Object.entries(data.flow)) {
      if (key === "goTo") {
        await goTo(page, value);
      }

      if (key === "expectTitle") {
        await expectTitle(page, value);
      }

      if (key === "clickOn") {
        await clickOn(page, value);
      }

      if (key === "expectUrl") {
        await expectUrl(page, value);
      }

      if (key === "expectAttribute") {
        await expectAttribute(page, value);
      }
    }
    await browser.close();
    console.log("Flow successfully completed");
  });

program.parse();
