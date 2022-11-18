import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";
import { ClickOn, HasLocator, OnLocator } from "./types";

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

export const onLocator = async (page: Page, value: any) => {
  // TODO needs better type assertion
  const locatorDataObject = value as OnLocator;
  const locatorRole = locatorDataObject.role;
  const locatorRoleName = locatorDataObject.name;

  // Needs to be way more general use, support all locator options
  const locator = page.getByRole(locatorRole, { name: locatorRoleName });

  if (locatorDataObject.expectAttribute) {
    await expectAttribute(
      locator,
      locatorDataObject.expectAttribute.name,
      locatorDataObject.expectAttribute.value
    );
  }
};

export const expectTitle = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectTitle value must be a string");
  }
  await expect(page).toHaveTitle(RegExp(value));
};

export const expectAttribute = async (
  locator: Locator,
  name: any,
  value: any
) => {
  if (typeof name !== "string") {
    throw new Error("expectAttribute name must be a string");
  }
  if (typeof value !== "string") {
    throw new Error("expectAttribute value must be a string");
  }
  await expect(locator).toHaveAttribute(name, value);
};

export const expectUrl = async (page: Page, value: any) => {
  if (typeof value !== "string") {
    throw new Error("expectUrl value must be a string");
  }
  await expect(page).toHaveURL(RegExp(value as string));
};
