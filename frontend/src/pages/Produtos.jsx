import { useState, useEffect } from 'react'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function buscarProdutos(){
            try {
                const resposta = await fetch('http://localhost:3000/produtos')
                const dados = await resposta.json()
                setProdutos(dados)
            } catch {
                setErro(' Não foi possível carregar os produtos.')
            } finally {
                setCarregando(false)
            }
        }

        buscarProdutos()
    }, [])

    function formatarPreco(preco) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco)
    }
    
    if (carregando) {
        return (
            <main style = {styles.main}>
                <p style={styles.mensagem}>Carregando...</p>
            </main>
        )
    }

    if (erro) {
        return (
            <main style = {styles.main}>
                <p style={styles.mensagem}>{erro}</p>
            </main>
        )
    }

    return (
        <main style={styles.main}>

            <div styles={styles.cabecalho}>
                <p styles={styles.subtitulo}>Inverno 2025</p>
                <h1 style={styles.titulo}>Coleção</h1>
            </div>

            <div style={styles.grid}>
                {produtos.map(produto=> (
                    <div key={produto.id} style={styles.card}>
                        <div style={styles.imagemPlaceholder}>
                            <span style={styles.imagemTexto}>{produto.categoria}</span>
                        </div>

                        <div style={styles.cardInfo}>
                            <p style={styles.cardCategoria}>{produto.categoria}</p>
                            <h2 style={styles.cardNome}>{produto.nome}</h2>
                            <p style={styles.cardDescricao}>{produto.descricao}</p>
                            <p style={styles.cardPreco}>{formatarPreco(produto.preco)}</p>
                        </div>
                      </div>  
                ))}
            </div>

        </main>
    )
}

const styles = {
  main: {
    padding: '4rem',
    minHeight: '100vh',
  },
  cabecalho: {
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  subtitulo: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.7rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
  },
  titulo: {
    fontFamily: 'var(--fonte-titulo)',
    fontSize: '3.5rem',
    fontWeight: 300,
    letterSpacing: '0.02em',
  },
  grid: {
    display: 'grid',
    // Cria colunas que se adaptam ao tamanho da tela.
    // Cada coluna tem no mínimo 280px e no máximo 1fr (fração igual do espaço).
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '3rem 2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    cursor: 'pointer',
  },
  imagemPlaceholder: {
    width: '100%',
    aspectRatio: '3/4',
    backgroundColor: 'var(--cor-borda)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemTexto: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  cardCategoria: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
  },
  cardNome: {
    fontFamily: 'var(--fonte-titulo)',
    fontSize: '1.4rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
  },
  cardDescricao: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.8rem',
    color: 'var(--cor-secundaria)',
    fontWeight: 300,
  },
  cardPreco: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.85rem',
    fontWeight: 400,
    marginTop: '0.25rem',
  },
  mensagem: {
    textAlign: 'center',
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.85rem',
    color: 'var(--cor-secundaria)',
    marginTop: '8rem',
  }
}