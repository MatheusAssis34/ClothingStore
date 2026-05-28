import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const [usuario, setUsuario] = useState(()=>{
        const salvo = localStorage.getItem('usuario')
        return salvo ? JSON.parse(salvo) : null
    })
    
    const navigate = useNavigate()

    function handleSair() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        setUsuario(null)
        navigate('/')
    }

    return(
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
                ARARA
            </Link>
        

            <div style={styles.links}>
                <Link to="/produtos" style={styles.link}>Coleção</Link>
                {usuario ?(
                    <>
                        <span style={styles.nomeUsuario}>{usuario.nome}</span>
                        <button onClick={handleSair} style={styles.botaoSair}>Sair</button>
                    </>
                ):(<Link to="/login" style={styles.link}>Entrar</Link>
            )}               
            </div>
        </nav>
    )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 4rem',
    borderBottom: '1px solid var(--cor-borda)',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--cor-fundo)',
    zIndex: 100,
  },
  logo: {
    fontFamily: 'var(--fonte-titulo)',
    fontSize: '1.4rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
  },
  links: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.75rem',
    fontWeight: 300,
    letterSpacing: '0.30em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
    transition: 'color 0.2s',
  },
  nomeUsuario: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.75rem',
    fontWeight: 300,
    letterSpacing: '0.15em',
    color: 'var(--cor-texto)',
  },
  botaoSair: {
    fontFamily: 'var(--fonte-corpo)',
    fontSize: '0.75rem',
    fontWeight: 300,
    letterSpacing: '0.30em',
    textTransform: 'uppercase',
    color: 'var(--cor-secundaria)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  }
}