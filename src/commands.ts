import { expect } from "@playwright/test";
import { Page } from "playwright";
import { ClickOn, ExpectAttribute, HasLocator } from "./types";

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
    const locatorDataObject = (value as HasLocator).locator;
    const locatorRole = locatorDataObject.role;
    const locatorRoleName = locatorDataObject.name;

    const locator = page.getByRole(locatorRole, {
      name: locatorRoleName,
    });
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

  // Needs to be way more general use, support all locator options
  const locator = page.getByRole(expectAttributeDataObject.locator.role, {
    name: expectAttributeDataObject.locator.name,
  });
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
