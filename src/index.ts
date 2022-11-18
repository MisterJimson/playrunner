import { expect } from "@playwright/test";
import { chromium } from "playwright";
import fs from 'fs'
import { expectTitle, goTo } from "./commands";

const { Command } = require("commander");
const figlet = require("figlet");
const yaml = require('js-yaml');


const program = new Command();

console.log(figlet.textSync("Playrunner"));

program
    .version("1.0.0")
    .description("Run playwright tests from simple yaml flows");

program.command('run')
    .description('Run a flow')
    .argument('<string>', 'Flow file')
    .action(async (str: string, options: Record<string, string>) => {

        const file = fs.readFileSync(process.cwd() + '/' + str, 'utf8');

        // Load the flow from yaml into a javascript object using js-yaml
        let data = yaml.load(file);

        // Start the browser and create a new page
        const browser = await chromium.launch({
            headless: false,
        });  // Or 'firefox' or 'webkit'.
        const page = await browser.newPage();


        // Loop through the flow and execute the commands
        for (const [key, value] of Object.entries(data.flow)) {
            if (key === 'goTo') {
                goTo(page, value);
            }

            if (key === 'expectTitle') {
                expectTitle(page, value);
            }

            if (key === 'onLocator') {
                const locatorDataObject = value as OnLocator;
                const locatorRole = locatorDataObject.role;
                const locatorRoleName = locatorDataObject.name;

                // Needs to be way more general use
                const locator = page.getByRole(locatorRole, { name: locatorRoleName });

                if (locatorDataObject.expectAttribute) {
                    await expect(locator).toHaveAttribute(locatorDataObject.expectAttribute.name, locatorDataObject.expectAttribute.value);
                }
            }

            if (key === 'clickOn') {
                const clickOnDataObject = value as ClickOn;

                if (typeof value === 'string') {
                    await page.click(value);
                } else {
                    console.log(value);
                    const locatorDataObject = (value as HasLocator).locator;
                    console.log(locatorDataObject);
                    const locatorRole = locatorDataObject.role;
                    const locatorRoleName = locatorDataObject.name;

                    const locator = page.getByRole(locatorRole, { name: locatorRoleName });
                    await locator.click();
                }
            }

            if (key === 'expectUrl') {
                await expect(page).toHaveURL(RegExp(value as string));
            }
        }


        await browser.close();
    });

program.command('demo')
    .description('Run a flow')
    .action(async (str: string, options: Record<string, string>) => {

        const browser = await chromium.launch({
            headless: false,
        });  // Or 'firefox' or 'webkit'.

        const page = await browser.newPage();


        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(RegExp('Playwright'));

        // create a locator
        const getStarted = page.getByRole('link', { name: 'Get started' });

        // Expect an attribute "to be strictly equal" to the value.
        await expect(getStarted).toHaveAttribute('href', '/docs/intro');

        // Click the get started link.
        await getStarted.click();

        // Expects the URL to contain intro.
        await expect(page).toHaveURL(RegExp('.*intro'));

        await browser.close();
    });

program.parse();


interface Locator {
    role: "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem";
    name: string;
}

interface OnLocator extends Locator {
    expectAttribute?: ExpectAttribute;
}

interface ExpectAttribute {
    name: string;
    value: string;
}

interface HasLocator {
    locator: Locator;
}

type ClickOn = HasLocator | string;
