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
  goTo: "https://playwright.dev/"   # Navigate to a URL
  expectTitle: Playwright           # Check the page title, supports RegEx
  onLocator:                        # Locate an element
    role: link
    name: Get started
    expectAttribute:                # Assert an attribute on the located element
      name: href
      value: /docs/intro
  clickOn:                          # Locate and click on an element
    locator:
      role: link
      name: Get started
expectUrl: .*intro                  # Check the current URL, supports RegEx
```

## Notes
This project is super early and most Playwright capabilities are not hooked up yet. The only enabled capabilities are those found used in the `examples` folder.
