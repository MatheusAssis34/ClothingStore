import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database.js'

const router = express.Router()

const SEGREDO = 'segredo_temporario'

router.post('/cadastro', async (req, res) => {
    const {nome, email, senha} = req.body
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.'})
    }

    const hashSenha = await bcrypt.hash(senha, 10)
    try {
        const inserir = db.prepare(`
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?,?,?)
            `)

            inserir.run(nome, email, hashSenha)
            res.status(201).json({ mensagem: 'Usuário criado com sucesso.'})
        } catch (erro) {
            if (erro.code === 'SQLITE_CONSTRAINT_UNIQUE'){
                return res.status(409).json({ erro: 'Email já cadastrado'})
            }
            res.status(500).json({ erro: 'Erro interno'})
            }    
    })

    router.post('/login', async (req, res)=>{
        const {email, senha} = req.body

        if (!email || !senha){
            return res.status(400).json({ erro: 'Preencha todos os campos.'})
        }
        const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email)

        if (!usuario) {
            return res.status(401).json({ erro: 'Emial ou senha inválidos.'})
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Email ou senha inválidos.'})
        }
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email},
            SEGREDO,
            {expiresIn: '7d'}
        )
        res.json({
            mensagem: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id, 
                nome: usuario.nome,
                email: usuario.email,
            }
        })
    })

    export default router





