import { red } from 'colorette';
import prisma from '../lib/prisma.js';

const updateCommand = async (id, title) => {
    id = parseInt(id);
    try {
        await prisma.tasks.update({
            data: {
                description: title,
            },
            where: {
                id,
            },
        });

        console.log(`Task (ID: ${id}) updated successfully.`);
    } catch (error) {
        console.error(`Failed to update task (ID: ${id}).`);
        console.error(red(error));
    }
};

export default updateCommand;
