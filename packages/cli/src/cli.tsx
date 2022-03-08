#!/usr/bin/env node

import React from "react";

import chalk from "chalk";
import { render } from "ink";
import meow from "meow";

import Install from "./commands/install";
import NewCommand from "./commands/new";
import RegisterCommand from "./commands/register";
import RunCommand from "./commands/run";
import UpgradeCommand from "./commands/upgrade";

const cli = meow(
  `
	Usage
    $ mfe-cli ${chalk.gray("<command>")}
    
  Commands
    - install
    - new ${chalk.gray("[directory]")}
    - run ${chalk.gray("[...apps]")}
    - register ${chalk.gray("[directory]")}
    - upgrade

	Examples
	  $ mfe-cli new lbh-microfrontend-project
   ${chalk.gray(
     "- Starts the scaffolding in a new folder in cwd called lbh-microfrontend-project",
   )}
   $ mfe-cli run
   ${chalk.gray("- Starts only the required apps")}
   $ mfe-cli run search tenure
   ${chalk.gray(
     "- Starts the required apps, plus lbh-microfrontend-search and lbh-microfrontend-tenure",
   )}
   $ mfe-cli run mfe
   ${chalk.gray(
     "- Starts the required apps, plus all apps prefixed with mfe (most if not all)",
   )}
`,
);

const [command, ...args] = cli.input;

if (command === "install") {
  render(<Install />);
} else if (command === "new") {
  render(<NewCommand dir={args[0]} />);
} else if (command === "run") {
  render(<RunCommand scopes={args} />);
} else if (command === "register") {
  render(<RegisterCommand dir={args[0]} />);
} else if (command === "upgrade") {
  render(<UpgradeCommand />);
} else {
  cli.showHelp();
}

// render(<App scope={cli.input} />);
