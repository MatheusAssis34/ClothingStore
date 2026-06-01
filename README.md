# Arara

Loja de roupas minimalista com autenticação de usuário.

## Tecnologias

- **Frontend:** React 19 + Vite 8
- **Backend:** Node.js + Express
- **Banco de dados:** SQLite com better-sqlite3
- **Autenticação:** JWT + bcrypt

## Estrutura do projeto

```
loja-roupas/
  frontend/
    src/
      components/
        Navbar.jsx
      pages/
        Home.jsx
        Login.jsx
        Produtos.jsx
      styles/
        global.css
      App.jsx
      main.jsx
  backend/
    rotas/
      auth.js
      produtos.js
    database.js
    server.js
```

## Como rodar

### Backend

```bash
cd backend
npm install
node server.js
```

O servidor sobe em `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Rotas da API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/cadastro | Cria um novo usuário |
| POST | /auth/login | Autentica o usuário e retorna o token JWT |

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/:id | Busca um produto pelo id |
| POST | /produtos | Cria um novo produto |

## Variáveis de ambiente

O projeto ainda usa valores fixos no código. Antes de ir para produção, mova estas variáveis para um arquivo `.env`:

```
JWT_SECRET=sua_chave_secreta
PORT=3000
```

## Próximos passos

- [ ] Página de cadastro de usuário
- [ ] Upload de imagens dos produtos
- [ ] Carrinho de compras
- [ ] Painel administrativo para gerenciar produtos