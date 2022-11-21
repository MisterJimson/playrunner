import { test, expect } from "@playwright/test";
import fs from "fs";
import yaml from "js-yaml";
import { clickOn, expectTitle, goTo, onLocator, expectUrl } from "./commands";

const file = fs.readFileSync(
  process.cwd() + "/" + process.env.FLOW_FILE,
  "utf8"
);

// Load the flow from yaml into a javascript object using js-yaml
let data = yaml.load(file);

// @ts-ignore TODO
test(data.description, async ({ page }) => {
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
      await expectUrl(page, value);
    }
  }
});
