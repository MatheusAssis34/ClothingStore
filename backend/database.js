import Database from 'better-sqlite3'

const db = new Database('loja.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS produtos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco INTEGER NOT NULL,
        categoria TEXT,
        imagem TEXT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

export default db