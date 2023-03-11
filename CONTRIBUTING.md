## Developer Setup

1. Install mysql and start it
2. create an .env file with following information

```
DATABASE_URL=<your-own-mysql-database-connection-url>
OPENAI_API_KEY=<your-own-openai-api-key>
```

3. Migrate prisma

```shell
npx prisma migrate dev --name init
```

4. Run the project

```shell
npm run dev
```
