# Biblioteca Universitária

<div align="center">
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mariaseverino/projeto-final?color=6C63FF&logoColor=6C63FF&style=for-the-badge">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mariaseverino/projeto-final?color=6C63FF&logoColor=6C63FF&style=for-the-badge">
  </p>
</div>

<p align="center">
 <a href="#Sobre">Sobre</a> •
 <a href="#Prototipo">Protótipo do projeto</a> •
 <a href="#Tecnologias">Tecnologias</a> •
 <a href="#Estrutura de Diretorios">Estrutura de diretórios</a>
</p>

<p align="center">
 <a href="#Como executar o projeto">Como executar o projeto</a> •
 <a href="#Padrões de Commit">Padrões de commit</a>
</p>

## :sparkles: Sobre

O sistema implementado tem o objetivo de ajudar na organização de uma biblioteca universitária, possibilitando o controle de empréstimo dos livros. Os funcionários serão responsáveis por cadastrar os alunos, os livros, e as informações referentes ao empréstimo.

## :lipstick: Protótipo do projeto

-   **[Figma](https://www.figma.com/file/nWi4kwhiHhkOdGy4M4uC2y/Untitled?node-id=0%3A1)**

## :rocket: Tecnologias

-   Node - `v14.17.0`
-   React - `v17.0.2`
-   SQLite - `v5.0.2`
-   Knex - `v0.95.13`
-   Objection - `v3.0.0`
-   Express - `v4.17.1`
-   Nodemon - `v2.0.14`
-   Bcryptjs - `v2.4.3`
-   Axios - `v0.24.0`
-   Date-fns - `v2.25.0`

## :open_file_folder: Estrutura de diretórios

```
├── Codigo
│   ├── backend
│   └── frontend
├── Padrões Adotados
└── Requisitos
    └── Diagrama de Classe
        └── Diagrama de Sequencia
```

## 🤔 Como executar o projeto

### :rotating_light: Pré requisito

Antes de começar, você vai precisar ter instalado em sua máquina o [Node.js](https://nodejs.org/). De modo opcional, seria interessante também ter instalado o gerenciador de pacotes [yarn](https://yarnpkg.com/).

```bash
# Clone este repositório
$ git clone git clone https://github.com/mariaseverino/projeto-final.git

# Acesse a pasta do projeto
$ cd projeto-final
```

### :file_folder: Backend

```bash
# Acesse a pasta do backend
$ cd Codigo/backend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start

# Rodando em http://localhost:3333
```

### :game_die: Frontend

```bash
# Acesse a pasta do frontend
$ cd Codigo/frontend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start

# Rodando em http://localhost:3000
```

**Obs**: Caso tenha o yarn instalado

```bash
# Instale as dependências
$ yarn

# Execute a aplicação
$ yarn start
```

## :pushpin: Padrões de commit

-   Utilizar verbos no gerúndio
-   Fazer referência ao requisito que esta sendo desenvolvido ou foi implementado
