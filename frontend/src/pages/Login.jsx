import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setErro('')
        setCarregando(true)

        try{
          const resposta = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email,senha})
          })
          const dados = await resposta.json()

          if (!resposta.ok){
            setErro(dados.erro)
            return
          }

          localStorage.setItem('token', dados.token)
          localStorage.setItem('usuario', JSON.stringify(dados.usuario))

          navigate('/')

        } catch {
          setErro('Não foi possível conectar ao servidor.')
        } finally {
          setCarregando(false)
        }
      }

    return(
        <main style={styles.main}>
            <div style={styles.caixa}>

                <h1 style={styles.titulo}>Entrar</h1>
                <p style={styles.subtitulo}>Acesse sua conta</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.campo}>
                        <label style={styles.label}>Email</label>

                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder=""
                            required
                        />
                    </div>

                    <div style={styles.campo}>
                        <label style={styles.label}>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            style={styles.input}
                            placeholder=""
                            required
                        />
                    </div>

                    {erro && <p styles={styles.erro}>{erro}</p>}

                    <button type="submit" style={styles.botao} disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                    
                </form>

                <p style={styles.rodape}>
                    Não tem conta?{' '}
                    <a href="/cadastro" style={styles.link}>Cadastre-se</a>
                </p>
            </div>
        </main>
    )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  caixa: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  titulo: {
    fontFamily: 'var(--fonte-titulo)',
    fontSize: '3rem',
    fontWeight: 300,
    letterSpacing: '0.02em',
  },
  subtitulo: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
    marginTop: '-1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
  },
  input: {
    padding: '0.85rem 0',
    border: 'none',
    borderBottom: '1px solid var(--cor-borda)',
    background: 'transparent',
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.9rem',
    color: 'var(--cor-texto)',
    outline: 'none',
    
    transition: 'border-color 0.2s',
  },
  botao: {
    marginTop: '0.5rem',
    padding: '0.9rem',
    border: '1px solid var(--cor-texto)',
    background: 'transparent',
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.3s, color 0.3s',
  },
  rodape: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: 'var(--cor-secundaria)',
  },
  link: {
    color: 'var(--cor-texto)',
    borderBottom: '1px solid var(--cor-texto)',
    paddingBottom: '1px',
  }
}