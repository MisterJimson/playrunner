import { expect } from "@playwright/test";
import { Page } from "playwright";

export const goTo = async (page: Page, value: any) => {
    if (typeof value !== 'string') {
        throw new Error('goTo value must be a string');
    }
    await page.goto(value);
}

export const expectTitle = async (page: Page, value: any) => {
    if (typeof value !== 'string') {
        throw new Error('goTo value must be a string');
    }
    await expect(page).toHaveTitle(RegExp(value));
}