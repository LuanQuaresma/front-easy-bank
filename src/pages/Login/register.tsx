import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, cpf, address }),
            });

            const data = await response.json();

            if (response.ok) {
                setError('');
                alert('Registro bem-sucedido!');
                navigate('/'); // Redireciona para a página inicial após o registro bem-sucedido
            } else {
                setError(data.message || 'Erro ao fazer registro. Tente novamente.');
            }
        } catch (error) {
            setError('Erro ao se conectar com o servidor. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Registro</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
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
                        minLength={2} // Adicionando uma validação básica de comprimento mínimo da senha
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        style={styles.input}
                        minLength={11} // Adicionando uma validação básica de comprimento mínimo do CPF
                        maxLength={11} // Adicionando uma validação básica de comprimento máximo do CPF
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="address">Endereço:</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ ...styles.input, height: '100px' }} // Ajustando a altura do textarea
                        required
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Carregando...' : 'Registrar'}
                </button>
            </form>
            <Link to="/" style={styles.loginLink}>Já tem uma conta? Faça login</Link>
        </div>
    );
};

const styles = {
    container: {
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
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    loginLink: {
        marginTop: '10px',
        textDecoration: 'none',
        color: '#007bff',
        display: 'block',
    },
    error: {
        color: 'red',
    }
};

export default Register;
