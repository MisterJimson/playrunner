import { expect, Locator } from "@playwright/test";
import { Page } from "playwright";
import { ClickOn, ExpectAttribute, HasLocator, RoleLocator } from "./types";

/// Take value from yaml input and convert to Locator
export const getLocatorFromYaml = (page: Page, value: any): Locator => {
  if (typeof value === "string") {
    return page.locator(value);
  } else if (typeof value === "object") {
    if (value.hasOwnProperty("role") && value.hasOwnProperty("name")) {
      return page.getByRole(value.role, { name: value.name });
    }
  }

  throw new Error(`Unable to create locator from yaml: ${value}`);
};

export const goTo = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("goTo value must be a string");
  }
  await page.goto(value);
};

export const clickOn = async (page: Page, value: any) => {
  const clickOnDataObject = value as ClickOn;

  if (typeof value === "string") {
    await page.click(value);
  } else {
    const locator = getLocatorFromYaml(page, (value as HasLocator).locator);
    await locator.click();
  }
};

export const expectTitle = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectTitle value must be a string");
  }
  await expect(page).toHaveTitle(RegExp(value));
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
  if (typeof expectAttributeDataObject.locator !== "object") {
    throw new Error("expectAttribute.locator must be a object");
  }

  const locator = getLocatorFromYaml(page, expectAttributeDataObject.locator);
  await expect(locator).toHaveAttribute(
    expectAttributeDataObject.name,
    expectAttributeDataObject.value
  );
};

export const expectUrl = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectUrl value must be a string");
  }
  await expect(page).toHaveURL(RegExp(value));
};
