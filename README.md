## ROQ Next.js, Prisma, Quickstart

This is a [ROQ](https://roq.tech) project showcasing how to use ROQ UI widgets and backend APIs with a combination of these technologies

- [ROQ React Components](https://www.npmjs.com/package/@roq/ui-react)
- [ROQ Node.js SDK](https://www.npmjs.com/package/ronodejs-sdk)
- [Next.js](https://nextjs.org), bootstrapped with `create-next-app`
- [Prisma ORM](https://www.prisma.io) with Postgres

## Get started

Step 1 - You need a running Postgres instance. You may start it up by just running

```bash
docker-compose up
```

Step 2 - Setup your ROQ environment variables. Check the example .env.example file
You can get the environment variables from the [ROQ Console](https://console.roq.tech)

```bash
cp .env.example .env
# Get the variables from the ROQ console, and replace the values
```

Step 3 - You can then install, run migrations, and start up your application

```bash
# With Yarn
yarn
npx prisma migrate dev
yarn dev

or

# With npm
npm install
npx prisma migrate dev
npm run dev
```

Your app should be running at [http://localhost:3000](http://localhost:3000) by default.

## Further documentation

To learn more about ROQ UI components and APIs, take a look at [ROQ Documentation](https://nextjs.org/docs)
