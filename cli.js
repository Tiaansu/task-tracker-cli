#!/usr/bin/env node
import fs from 'node:fs';

const store = './store.json';

if (!fs.existsSync(store)) {
    fs.writeFileSync(store, JSON.stringify([]));
}

let todos = JSON.parse(fs.readFileSync(store, 'utf-8'));

const saveTodo = () => {
    fs.writeFileSync(store, JSON.stringify(todos, null, 4));
};

function main() {
    const allowedStatus = ['todo', 'in-progress', 'done'];

    const parseArguments = () => {
        const args = process.argv.slice(2);
        const command = args[0];
        const options = args.slice(1);

        return { command, options };
    };

    const executeCommand = (command, options) => {
        switch (command) {
            case 'add':
                addCommand(options.join(' '));
                break;
            case 'update':
                updateCommand(parseInt(options[0]), options.slice(1).join(' '));
                break;
            case 'delete':
                deleteCommand(parseInt(options[0]));
                break;
            case 'mark-in-progress':
                markInProgressCommand(parseInt(options[0]));
                break;
            case 'mark-done':
                markDoneCommand(parseInt(options[0]));
                break;
            case 'list':
                listCommand(options.join(' '));
                break;
            default: {
                if (!command) {
                    console.log(`add                Add a task.`);
                    console.log(`update             Update a task.`);
                    console.log(`delete             Delete a task.`);
                    console.log(`mark-in-progress   Mark task as in-progress.`);
                    console.log(`mark-done          Mark task as done.`);
                    console.log(
                        `list               List a task based on the option. Allowed options: ${allowedStatus.join(
                            ', '
                        )}`
                    );
                    return;
                }

                console.error(`Invalid command ${command}.`);
            }
        }
    };

    const { command, options } = parseArguments();
    executeCommand(command, options);

    function addCommand(task) {
        try {
            if (!task.length) {
                return console.error(`USAGE: task-cli add [title]`);
            }

            const newTodo = {
                id: todos.length + 1,
                description: task,
                status: 'todo',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            console.log(`Task added successfully (ID: ${newTodo.id})`);

            todos.push(newTodo);
            saveTodo();
        } catch (error) {
            console.error(error);
        }
    }

    function updateCommand(id, newTitle) {
        try {
            if (!id || !newTitle.length) {
                return console.error('USAGE: task-cli update [id] [new title]');
            }

            const index = todos.findIndex((todo) => todo.id === id);

            if (index === -1) {
                return console.error('The task id you entered is invalid.');
            }

            todos[index].description = newTitle;
            todos[index].updatedAt = new Date();
            console.log(`Task (ID: ${id}) updated successfully.`);
            saveTodo();
        } catch (error) {
            console.error(error);
        }
    }

    function deleteCommand(id) {
        try {
            if (!id) {
                return console.error('USAGE: task-cli delete [id]');
            }

            const index = todos.findIndex((todo) => todo.id === id);

            if (index === -1) {
                return console.error('The task id you entered is invalid.');
            }

            todos.splice(index, 1);
            console.log(`Task (ID: ${id}) deleted successfully.`);
            saveTodo();
        } catch (error) {
            console.error(error);
        }
    }

    function markInProgressCommand(id) {
        try {
            if (!id) {
                return console.error('USAGE: task-cli mark-in-progress [id]');
            }

            const index = todos.findIndex((todo) => todo.id === id);

            if (index === -1) {
                return console.error('The task id you entered is invalid.');
            }

            todos[index].status = 'in-progress';
            todos[index].updatedAt = new Date();
            console.log(`Task (ID: ${id}) marked as in-progress successfully.`);
            saveTodo();
        } catch (error) {
            console.error(error);
        }
    }

    function markDoneCommand(id) {
        try {
            if (!id) {
                return console.error('USAGE: task-cli mark-done [id]');
            }

            const index = todos.findIndex((todo) => todo.id === id);

            if (index === -1) {
                return console.error('The task id you entered is invalid.');
            }

            todos[index].status = 'done';
            todos[index].updatedAt = new Date();
            console.log(`Task (ID: ${id}) marked as done successfully.`);
            saveTodo();
        } catch (error) {
            console.error(error);
        }
    }

    function listCommand(option) {
        try {
            if (!allowedStatus.includes(option)) {
                return console.error('Invalid option.');
            }

            const tasks = option
                ? todos.filter((todo) => todo.status === option)
                : todos;

            if (!!!tasks.length) {
                return console.error(
                    `There is no task${
                        option ? ' with that option' : ''
                    } found.`
                );
            }

            for (const task of tasks) {
                console.log(`${task.id}. ${task.description} - ${task.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

main();
