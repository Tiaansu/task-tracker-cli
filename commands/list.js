import { red } from 'colorette';
import prisma from '../lib/prisma.js';
import { AsciiTable3 } from 'ascii-table3';

const listCommand = async (option) => {
    try {
        const tasks = await prisma.tasks.findMany(
            option
                ? {
                      where: {
                          status: option,
                      },
                  }
                : {}
        );

        if (!!!tasks.length) {
            return console.log(
                `There is no task${option ? ' with that option' : ''} found.`
            );
        }

        const table = new AsciiTable3(
            `Tasks${option ? ` with ${option} status` : ''}`
        )
            .setHeading(
                'ID',
                'Description',
                'Status',
                'Created At',
                'Updated At'
            )
            .setHeadingAlignCenter()
            .setStyle('unicode-single');

        for (const task of tasks) {
            table.addRow(
                task.id,
                task.description,
                task.status,
                task.createdAt,
                task.updatedAt
            );
        }

        console.log(table.toString());
    } catch (error) {
        console.error(
            `Failed to list tasks${option ? ` with ${option} status` : ''}.`
        );
        console.error(red(error));
    }
};

export default listCommand;
