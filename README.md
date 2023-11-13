# Como executar o projeto

Crie um arquivo .env com o conteúdo de .env.example

Garanta que tenha o docker instalado
e execute `docker compose up -d`

em um terminal digite `npm install` para instalar os pacotes

`npx prisma migrate dev` para rodar as migrações do banco
e `npx prisma db seed` para popular o banco

finalmente execute `npm run start:dev` para executar o projeto em modo de desenvolvimento
