import prisma from '../lib/prisma.js';

const addCommand = async (task) => {
    try {
        const taskCreated = await prisma.tasks.create({
            data: {
                description: task,
            },
        });

        console.log(`Task added successfully (ID: ${taskCreated.id})`);
    } catch (error) {
        console.error(`Failed to create task ${error}`);
    }
};

export default addCommand;
