#!/usr/bin/env node

import { red } from 'colorette';
import { Argument, Command } from 'commander';
import addCommand from './commands/add.js';
import updateCommand from './commands/update.js';
import deleteCommand from './commands/delete.js';
import markInProgressCommand from './commands/mark-in-progress.js';
import markDoneCommand from './commands/mark-done.js';
import listCommand from './commands/list.js';

const program = new Command();

program
    .name('task-cli')
    .description('A simple Task Tracker CLI')
    .version('1.0.0');

program
    .command('add')
    .addArgument(new Argument('<task>', 'The task you want to insert.'))
    .action(addCommand);

program
    .command('update')
    .addArgument(new Argument('<id>', 'The task id.'))
    .addArgument(new Argument('<title>', 'The new task title.'))
    .description('Update a task based on its id.')
    .action(updateCommand);

program
    .command('delete')
    .addArgument(new Argument('<id>', 'The task id you want to delete.'))
    .description('Delete task.')
    .action(deleteCommand);

program
    .command('mark-in-progress')
    .addArgument(
        new Argument('<id>', 'The task id you want to mark as in progress.')
    )
    .description('Mark task as in-progress.')
    .action(markInProgressCommand);

program
    .command('mark-done')
    .addArgument(new Argument('<id>', 'The task id you want to mark as done.'))
    .description('Mark task as done.')
    .action(markDoneCommand);

program
    .command('list [option]')
    .addArgument(new Argument('[option]'))
    .description('List all tasks or tasks based on the option.')
    .action(listCommand);

program.configureOutput({
    outputError: (str, write) => write(red(str)),
});

program.parse(process.argv);
