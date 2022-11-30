import { expect, Locator } from "@playwright/test";
import chalk from "chalk";
import { Page } from "playwright";
import {
  ClickOn,
  ExpectAttribute,
  ExpectTextWithLocator,
  Fill,
  HasLocator,
} from "./types";

/// Take value from yaml input and convert to Locator
export const getLocatorFromYaml = (page: Page, value: any): Locator => {
  if (typeof value === "string") {
    return page.locator(value);
  } else if (typeof value === "object") {
    // TODO stop using `any` below this line and type this stuff
    if (value.hasOwnProperty("role") && value.hasOwnProperty("name")) {
      return page.getByRole(value.role, { name: value.name });
    }
    if (value.hasOwnProperty("text")) {
      return page.getByText(value.text);
    }
    if (value.hasOwnProperty("label")) {
      return page.getByLabel(value.label);
    }
    if (value.hasOwnProperty("placeholder")) {
      return page.getByPlaceholder(value.placeholder);
    }
    if (value.hasOwnProperty("altText")) {
      return page.getByAltText(value.altText, {
        exact: value.exact ?? undefined,
      });
    }
    if (value.hasOwnProperty("title")) {
      return page.getByTitle(value.title);
    }
    if (value.hasOwnProperty("testId")) {
      return page.getByTestId(value.testId);
    }
  }

  throw new Error(`Unable to create locator from yaml: ${value}`);
};

export const goTo = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("goTo value must be a string");
  }
  await page.goto(value);
  logStepSuccess(`goTo ${value}`);
};

export const clickOn = async (page: Page, value: any) => {
  const clickOnDataObject = value as ClickOn;

  if (typeof value === "string") {
    await page.click(value);
    logStepSuccess(`clickOn ${value}`);
  } else {
    const locator = getLocatorFromYaml(page, (value as HasLocator).locator);
    await locator.click();
    logStepSuccess(`clickOn`);
  }
};

export const fill = async (page: Page, value: any) => {
  const fillDataObject = value as Fill;

  const locator = getLocatorFromYaml(page, fillDataObject.locator);
  await locator.fill(fillDataObject.text);
  logStepSuccess(`fill`);
};

export const expectTitle = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectTitle value must be a string");
  }
  await expect(page).toHaveTitle(RegExp(value));
  logStepSuccess(`expectTitle ${value}`);
};

export const expectAttribute = async (page: Page, value: any) => {
  // TODO needs better type assertion
  const expectAttributeDataObject = value as ExpectAttribute;
  if (typeof expectAttributeDataObject.name !== "string") {
    throw new Error("expectAttribute.name must be a string");
  }
  if (typeof expectAttributeDataObject.value !== "string") {
    throw new Error("expectAttribute.value must be a string");
  }

  const locator = getLocatorFromYaml(page, expectAttributeDataObject.locator);
  await expect(locator).toHaveAttribute(
    expectAttributeDataObject.name,
    expectAttributeDataObject.value
  );
  logStepSuccess(
    `expectAttribute ${expectAttributeDataObject.name} ${expectAttributeDataObject.value}`
  );
};

export const expectText = async (page: Page, value: any) => {
  if (typeof value === "string") {
    await expect(page.getByText(value)).toHaveText(RegExp(value));
    logStepSuccess(`expectText ${value}`);
  } else if (typeof value === "object") {
    const expectTextDataObject = value as ExpectTextWithLocator;
    const locator = getLocatorFromYaml(page, expectTextDataObject.locator);
    await expect(locator).toHaveText(RegExp(expectTextDataObject.text));
    logStepSuccess(`expectText ${expectTextDataObject.text}`);
  }
};

export const expectUrl = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectUrl value must be a string");
  }
  await expect(page).toHaveURL(RegExp(value));
  logStepSuccess(`expectUrl ${value}`);
};

const logStepSuccess = (message: string) => {
  console.log(chalk.blue("Step: ") + chalk.green(`${message} ✅`));
};
