import express from 'express'
import cors from 'cors'
import db from './database.js'
import authRotas from './rotas/auth.js'
import produtosRotas from './rotas/produtos.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRotas)
app.use('/produtos', produtosRotas)

app.get('/', (req, res) => {
    res.json({ mensagem: 'Servidor rodando.'})
})

app.listen(3000, ()=>{
    console.log('Servidor rodando em http://localhost:3000')
})