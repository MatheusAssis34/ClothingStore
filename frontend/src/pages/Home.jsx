export default function Home() {
    return (
        <main style={styles.main}>
            <section style={styles.hero}>
                <p style={styles.subtitulo}>Nova Coleção - Inverno 2025</p>
                <h1 style={styles.titulo}>
                    Tecidos que<br />contam histórias
                </h1>
                <button style={styles.botao}>Ver coleção</button>
            </section>
        </main>
    )
}

const styles = {
    main: {
        minHeight: '100vh',
    },
    hero: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem',
        gap: '2rem',
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
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        fontWeight: 300,
        lineHeight: 1.1,
        letterSpacing: '0.02em',

    },
    botao: {
        marginTop: '1rem',
        padding: '0.9rem 2.5rem',
        border: '1px solid var(--cor-texto)',
        background: 'transparent',
        fontFamily: 'var(--fonte-corpo)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'background 0.3s, color 0.3s',
    }
}