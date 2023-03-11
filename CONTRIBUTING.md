Install mysql

start mysql

cp .env.example to .env

DATABASE_URL=mysql://root@localhost:3306/test
OPENAI_API_KEY=<your-own-openai-api-key>

npx prisma migrate dev --name init
