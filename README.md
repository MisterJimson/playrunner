# Playrunner
A user flow testing tool for websites based on [Playwright](https://playwright.dev/).

Inspired by [fluttium](https://github.com/wolfenrain/fluttium)

## Usage
This package isn't published yet. So for now.

- Clone the repo and `cd` into it, then `npm i` to install dependencies.
- Run `npm run dev -- <flow_file>` to execute your flow.

Try `npm run dev -- examples/playwright.yaml` to run the example flow.

```yaml
# This flow recreates the example test from the Playwright docs https://playwright.dev/docs/writing-tests#the-example-test
flow:
  goTo: "https://playwright.dev/"
  expectTitle: Playwright
  onLocator:
    role: link
    name: Get started
    expectAttribute:
      name: href
      value: /docs/intro
  clickOn:
    locator:
      role: link
      name: Get started
expectUrl: .*intro

```

## Notes
This project is super early and most Playwright capabilities are not hooked up yet. The only enabled capabilities are those found used in the `examples` folder.
