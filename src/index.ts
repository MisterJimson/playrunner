import { expect } from "@playwright/test";
import { chromium } from "playwright";
import fs from "fs";
import { clickOn, expectTitle, goTo, onLocator } from "./commands";

import { Command } from "commander";
import figlet from "figlet";
import yaml from "js-yaml";

const program = new Command();

console.log(figlet.textSync("Playrunner"));

program
  .version("1.0.0")
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

    // Loop through the flow and execute the commands
    // @ts-ignore TODO
    for (const [key, value] of Object.entries(data.flow)) {
      if (key === "goTo") {
        await goTo(page, value);
      }

      if (key === "expectTitle") {
        await expectTitle(page, value);
      }

      if (key === "onLocator") {
        await onLocator(page, value);
      }

      if (key === "clickOn") {
        await clickOn(page, value);
      }

      if (key === "expectUrl") {
        await expect(page).toHaveURL(RegExp(value as string));
      }
    }
    await browser.close();
    console.log("Flow successfully completed");
  });

program.parse();
