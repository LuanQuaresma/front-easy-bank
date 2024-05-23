import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importando Link para o botão Registrar

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setError('');
                alert('Login bem-sucedido!');
                navigate('/home');  // Redireciona para a rota /home
            } else {
                setError(data.message || 'Erro ao fazer login. Tente novamente.');
            }
        } catch (error) {
            setError('Erro ao se conectar com o servidor. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Carregando...' : 'Entrar'}
                </button>
            </form>
            {/* Adicionando o botão Registrar */}
            <Link to="/register" style={styles.registerButton}>Registrar</Link>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "ff ff",
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'center' as 'center', // TypeScript needs the cast here
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column', // TypeScript needs the cast here
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '10px', // Adicionado para dar espaço entre o botão "Entrar" e o botão "Registrar"
    },
    error: {
        color: 'red',
    },
    registerButton: {
        textDecoration: 'none',
        color: '#333',
    }
};

export default Login;
