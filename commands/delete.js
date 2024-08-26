import { red } from 'colorette';
import prisma from '../lib/prisma.js';

const deleteCommand = async (id) => {
    id = parseInt(id);

    try {
        await prisma.tasks.delete({
            where: {
                id,
            },
        });

        console.log(`Successfully deleted task (ID: ${id}).`);
    } catch (error) {
        console.error(`Failed to delete task (ID: ${id}):`);
        console.error(red(error));
    }
};

export default deleteCommand;
