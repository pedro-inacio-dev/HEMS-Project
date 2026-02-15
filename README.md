# Home Expense Management System (HEMS)

## Objetivo
Implementar um Sistema de Controle de Gastos Residenciais.

## Funcionalidades

- Cadastro e listagem de categoria, pessoa e transação
- CRUD completo apenas para pessoa
- Listagem de total de valores de despesa, receita e saldo por pessoa
- Listagem de total de valores de despesa, receita e saldo por categoria

## Tecnologias

- .NET 8
- C#
- PostgreSQL 16
- Next.js
- TypeScript
- Tailwind

## Arquitetura do Projeto

No backend o projeto segue os príncipios e estrutura do Clean Architecture e Clean Code para possibilidar escalabilidade, testes e modularidade ao projeto

A organização no back é baseada na divisão entre camadas como Dominio, application, infraestructure e API
  - Dominio: responsável pela lógica de negócio e entidades bases do banco
  - Application: controla e organiza a comunicação entre a api, dominio e infraestrutura com pouca regra de negócio de preferência
  - Infraestructure: responsável pela comunicação com o banco
  - API: comunicação externa, não tem nenhuma lógica de negócio

No front o projeto segue o modelo baseado em pages/components/layout do padrão AppRouter onde as pastas definem o caminho das rotas do projeto

## Instalação

Back-end: 
1. Clone o repositório:
   - git clone https://github.com/pedro-inacio-dev/HEMS-Project
2. Entre na pasta:
   - cd HomeExpenseManagementSystem/Back-end/
3. Instale as dependências:
   - dotnet restore
4. Configure o banco de dados:
   - Crie um banco PostgreSQL da versão 16
   - Atualize a string de conexão no appsettings.json com o nome do banco
   - utilize o comando dentro da pasta backend para a primeira migração: 
        - dotnet ef migrations add InitialCreate --project HEMS.Infrastructure --startup-project HEMS.API --output-dir Persistence/Migrations
   - utilize o comando dentro da pasta backend efetivar a migração: 
        - dotnet ef database update --project HEMS.Infrastructure --startup-project HEMS.API
5. Rode a aplicação:
   - dotnet run

Front-end
1. Clone o repositório:
   - git clone https://github.com/pedro-inacio-dev/HEMS-Project
2. Entre na pasta:
   - cd HomeExpenseManagementSystem/Front-end/hems-front/
3. Instale as dependências:
   - pnpm install
5. Rode a aplicação:
   - pnpm dev

