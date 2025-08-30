#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { devCommand } from './commands/dev';
import { buildCommand } from './commands/build';
import { deployCommand } from './commands/deploy';

const program = new Command();

program
  .name('skelegit')
  .description('CLI for Skelegit - Git interface toolkit')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize a new Skelegit project')
  .option('-t, --template <template>', 'Project template', 'basic')
  .action(initCommand);

program
  .command('dev')
  .description('Start development server')
  .option('-p, --port <port>', 'Port number', '3000')
  .action(devCommand);

program
  .command('build')
  .description('Build the project')
  .option('-o, --output <dir>', 'Output directory', 'dist')
  .action(buildCommand);

program
  .command('deploy')
  .description('Deploy the project')
  .option('-t, --target <target>', 'Deployment target')
  .action(deployCommand);

program.parse();
