#!/usr/bin/env node

import { Command } from "commander";

var shell = require("shelljs");
var path = require("path");

global.appRoot = path.resolve(__dirname);

const program = new Command();

program
  .version("1.0.0")
  .description("Run playwright tests from simple yaml flows");

program
  .command("run")
  .description("Run a flow")
  .argument("<string>", "Flow file")
  .action(async (str: string, options: Record<string, string>) => {
    const pathToTestTarget = `${global.appRoot.substring(
      0,
      appRoot.length - 4
    )}src/target.spec.ts`;
    const pwCommand = `FLOW_FILE=${str} npx playwright test ${pathToTestTarget}`;
    shell.exec(pwCommand);
  });

program.parse();
