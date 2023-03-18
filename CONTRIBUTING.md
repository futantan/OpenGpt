## Project Setup

1. install mysql

2. start mysql

3. load environment variables

cp .env.example to .env

DATABASE_URL=mysql://root@localhost:3306/test
OPENAI_API_KEY=<your-own-openai-api-key>

4. migrate DB

npx prisma migrate dev --name init

5. run Project

npm run dev
