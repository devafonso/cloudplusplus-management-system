# Cloud++ Global Project Management System

## Introdução

Este projeto é uma aplicação de gestão de projetos que permite aos usuários criar, visualizar, atualizar e deletar projetos e tarefas associadas. Foi desenvolvido como parte de um teste técnico para demonstrar habilidades em desenvolvimento full-stack.

## Funcionalidades

- Autenticação de usuários
- Criação, visualização, atualização e exclusão de projetos
- Interface amigável e responsiva

## Tecnologias Utilizadas

### Frontend

- **Vue.js:** Framework JavaScript para construção de interfaces de usuário.
- **Vue Router:** Roteamento para aplicativos Vue.js.
- **Pinia:** Gerenciamento de estado para Vue.js.
- **Axios:** Cliente HTTP baseado em Promises para fazer requisições para a API.
- **Bootstrap:** Framework front-end para desenvolvimento de sites e aplicações web responsivas.

### Backend

- **Laravel:** Framework PHP para desenvolvimento de aplicações web.
- **Laravel Sanctum:** Pacote oficial do Laravel para autenticação via tokens.
- **MySQL:** Banco de dados relacional utilizado para armazenamento dos dados.


## Instalação e Configuração

### Pré-requisitos

- Node.js
- Composer
- PHP
- MySQL

### Backend (Laravel)

1. **Clone o repositório e navegue até a pasta do backend:**

   ```bash
   git clone https://github.com/seu_usuario/seu_projeto.git
   cd backend/management-system/
   
2. **Instale as dependências do Laravel:**

   ```bash
   composer install
   
3. **Copie o arquivo de configuração do ambiente:**

   ```bash
   cp .env.example .env
   
4. **Configure o arquivo .env com as configurações do banco de dados:**

   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nome_do_seu_banco
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   
5. **Execute as migrações e as seeds para preparar o banco de dados:**

   ```bash
   php artisan migrate --seed

6. **Inicie o servidor backend:**

   ```bash
   php artisan serve --port=8000

### Frontend (Vue.js)

1. **Navegue até a pasta do frontend:**

   ```bash
   cd frontend/management-system/
   
2. **Instale as dependências do Vue.js:**

   ```bash
   npm install
   
3. **Inicie o servidor de desenvolvimento do frontend:**

   ```bash
   npm run serve
   
4. **Acesse o frontend em http://localhost:3000.**

## Vídeo de Usabilidade

Para uma visão mais detalhada da usabilidade da aplicação, confira o vídeo abaixo:

[![Vídeo de Usabilidade]([https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg)](https://www.youtube.com/watch?v=ID_DO_VIDEO](https://www.youtube.com/watch?v=VVNmRT9zTZo))






   
   

