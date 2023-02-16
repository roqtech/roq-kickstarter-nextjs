## ROQ SaaS template with Next.js, Prisma

This is a [ROQ](https://roq.tech) project showcasing how to use ROQ UI widgets and backend APIs with a combination of these technologies

- [ROQ Next.js](https://www.npmjs.com/package/@roq/nextjs) - a fullstack package for using ROQ UI, and backend SDKs with Next.js
- [ROQ React Components](https://www.npmjs.com/package/@roq/ui-react) (bundled into @roq/nextjs)
- [ROQ Node.js SDK](https://www.npmjs.com/package/@roq/nodejs) (bundled into @roq/nextjs)
- [Next.js](https://nextjs.org), bootstrapped with `create-next-app

## Get started

Step 1 - Clone the repository:

``` 
git clone git@github.com:roqtech/roq-kickstarter-nextjs.git
```

Step 2 - Setup your ROQ environment variables. Check the example .env.example file

* Login to [ROQ Console](https://console.roq.tech) (opens in a new tab) and go to Project Details ➔ Settings.
* Then add your base URL (usually it's http://localhost:3000/) and press the Save button (top right).
* When this is done, you can press the Copy Env File button and copy the entire output.
* Create a new file called .env in the root of your project and paste the content in.

```bash
cp .env.example .env
# Get the variables from the ROQ console, and replace the values
```

Step 3 - You can then install, and start up your application

```bash
# With Yarn
yarn
yarn dev

or

# With npm
npm install
npm run dev
```

Your app should be running at [http://localhost:3000](http://localhost:3000) by default.

## Further documentation

To learn more about ROQ UI components and APIs, take a look at [ROQ Documentation](https://docs.roq.tech)
