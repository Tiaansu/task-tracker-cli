import { green, red } from 'colorette';
import prisma from '../lib/prisma.js';

const markDoneCommand = async (id) => {
    id = parseInt(id);

    try {
        await prisma.tasks.update({
            data: {
                status: 'done',
            },
            where: {
                id,
            },
        });

        console.log(
            `Successfully marked task (ID: ${id}) as ${green('done')}.`
        );
    } catch (error) {
        console.error(`Failed to mark task (ID: ${id}) as done:`);
        console.error(red(error));
    }
};

export default markDoneCommand;
