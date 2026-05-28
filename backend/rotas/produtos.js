import express from 'express'
import db from "../database.js"

const router = express.Router()

router.get('/', (req, res) => {
    const produtos = db.prepare('SELECT * FROM produtos').all()

    const produtosFormatados = produtos.map(p => ({
        ...p,
        preco: p.preco / 100
    }))

    res.json(produtosFormatados)
})

router.get('/:id', (req, res) => {
    const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(req.params.id)

    if(!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado.'})
    }

    res.json({...produto, preco: produto.preco/100})
})

router.post('/', (req, res) => {
    const { nome, descricao, preco, categoria, imagem} = req.body

    if (!nome || !preco){
        return res.status(400).json({ erro: 'Nome e preço são obrigatórios.'})
    }

    const precoEmCentavos = Math.round(preco * 100)

    const inserir = db.prepare(`
        INSERT INTO produtos (nome, descricao, preco, categoria, imagem)
        VALUES (?, ?, ?, ?, ?)
        `)

    const resultado = inserir.run(nome, descricao, precoEmCentavos, categoria, imagem)
    
    res.status(201).json({
        mensagem: 'Produto criado com sucesso.',
        id: resultado.lastInsertRowid
    })
})

export default router