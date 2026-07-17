# App

Gympass style app.

## RFs (Requisitos funcionais)

A funcionalidade em si. "O que o usuário poderá fazer em nossa aplicação?".

"Deve ser possível X".

- [ ] Deve ser possível X se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado (Gympass implementou);
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário fazer check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

Quais condições são aplicadas para cada funcionalidade.

Ela sempre estará relacionada aos RFs.

Seriam os "ifs" da nossa aplicação ou caminhos diferentes que podem ser percorridos.

- [ ] O usuário não deve poder se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (a 100m) da academia;
- [ ] O check-in só pode ser validade até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

O cliente não foi possui contato, são quesitos técnicos.

"Qual banco de dados, estratégia de cache da aplicação, qual a abordagem de paginação, etc.".

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um  banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

-> ao iniciar, sempre levantar o container docker via docker compose up!

-> criação do schema

npx prisma init

após inserir um model no schema, rodar:

npx prisma generate

ISSO GERA AS TIPAGENS DO SEU SCHEMA.



-> https://hub.docker.com/

- levantar um container docker pela primeira vez:

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnamilegacy/postgresql

- exibir lista de containeres rodando:

docker ps

- exibir lista com todos os containeres criados em algum momento:

docker ps -a

- levantar/derrubar container específico:

docker start api-solid-pg

docker stop api-solid-pg

- deletar container específico:

docker rm api-solid-pg


Controle de versão do banco de dados são as migrations (snapshots do estado atual).

- gerar nova "commit" (snapshot): npx prisma migrate dev (rodar para salvar cada alteração, igual ao git)

- npx prisma studio


-> docker compose 

- levantar container docker:

docker compose up

- derrubar container docker:

docker compose stop

-> Teste de requisição:

curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Sidnei Farias Jr.", "email": "sidnei@example.com", "password": "123456"}'