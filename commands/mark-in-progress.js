import { green, red } from 'colorette';
import prisma from '../lib/prisma.js';

const markInProgressCommand = async (id) => {
    id = parseInt(id);

    try {
        await prisma.tasks.update({
            data: {
                status: 'in-progress',
            },
            where: {
                id,
            },
        });

        console.log(
            `Successfully marked task (ID: ${id}) as ${green('in progress')}.`
        );
    } catch (error) {
        console.error(`Failed to mark task (ID: ${id}) as in progress:`);
        console.error(red(error));
    }
};

export default markInProgressCommand;
