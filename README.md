# Playrunner
[![npm version](https://badge.fury.io/js/playrunner.svg)](https://badge.fury.io/js/playrunner)
![ci](https://github.com/MisterJimson/playrunner/actions/workflows/node.js.yml/badge.svg?branch=main)

A user flow testing tool for websites based on [Playwright](https://playwright.dev/).

Inspired by [fluttium](https://github.com/wolfenrain/fluttium)

## Usage
`npx playrunner run <path to flow file>`

Here is an example flow file. You can see more examples in the [examples](https://github.com/MisterJimson/playrunner/tree/main/examples) folder.

```yaml
# This flow recreates the example test from the Playwright docs https://playwright.dev/docs/writing-tests#the-example-test
- description: homepage has Playwright in title and get started link linking to the intro page
- goTo: "https://playwright.dev/"       # Navigate to a URL
- expectTitle: Playwright               # Check the page title, supports RegEx
- expectAttribute:                      # Check an attribute of an element
    name: href
    value: /docs/intro
    locator:
      role: link
      name: Get started
- clickOn:                              # Click on an element
    locator:
      role: link
      name: Get started
- expectUrl: .*intro                    # Check the URL, supports RegEx
```

## Development
- Clone the repo and `cd` into it, then `npm i` to install dependencies.
- Run `npm run dev -- <flow_file>` to execute your flow.

Try `npm run dev -- examples/playwright.yaml` to run the example flow.

## Notes
This project is in early development and most Playwright capabilities are not hooked up yet. The only enabled capabilities are those found used in the `examples` folder.
