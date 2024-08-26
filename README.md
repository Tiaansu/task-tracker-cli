## Task Tracker CLI

> [!IMPORTANT]
> I'm going to rewrite this as I didn't see the constraints of the project.

This is a simple Task Tracker CLI made using commander.js. It is based on the [roadmap.sh](https://roadmap.sh/projects/task-tracker) project.

### Preview

1. Add  
   ![task-cli add](./images/task-cli-add.png)

2. Update  
   ![task-cli update](./images/task-cli-update.png)

3. Delete  
   ![task-cli delete](./images/task-cli-delete.png)

4. Mark as in-progress  
   ![task-cli mark-in-progress](./images/task-cli-mark-in-progress.png)

5. Mark as done  
   ![task-cli mark-done](./images/task-cli-mark-done.png)

6. List
   ![task-cli list](./images/task-cli-list.png)

7. List with status
   ![task-cli list todo](./images/task-cli-list-todo.png)
   ![task-cli list in-progress](./images/task-cli-list-in-progress.png)
   ![task-cli list done](./images/task-cli-list-done.png)

### Prerequisites

    - MySQL database (you can change it to any database you want. You are free to do so.)
    - Node.JS
    - pnpm (optional, you can just use npm or yarn)

### Installation & Steps to run

-   Clone this repository
-   Run `pnpm install` or if you don't have pnpm installed, run `npm install` or `yarn install` instead.
-   Run `pnpm prisma db push` or if you don't have pnpm installed, run `npx prisma db push`

> [!NOTE]  
> You need to change the [schema.prisma](./prisma/schema.prisma) first if you are planning to use
> other database.

-   Run npm link
-   Run `task-cli`
