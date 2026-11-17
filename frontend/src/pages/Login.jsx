
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5001/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                setMessage('Login successful!');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 800);
            } else {
                setMessage(data.message || 'Invalid email or password');
            }

        } catch (error) {
            setMessage('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>

            <header style={styles.navbar}>
                <Link to="/" style={styles.logo}>
                    Career<span style={{ color: '#9180ff' }}>Path.</span>
                </Link>

                <Link to="/" style={styles.homeLink}>
                    Home
                </Link>
            </header>

            <main style={styles.main}>
                <div style={styles.loginCard}>

                    <div style={styles.headingSection}>
                        <p style={styles.welcome}>WELCOME BACK</p>

                        <h1 style={styles.heading}>
                            Login to Your Account
                        </h1>

                        <p style={styles.description}>
                            Continue your career journey with CareerPath.
                        </p>
                    </div>

                    {message && (
                        <div style={{
                            ...styles.message,
                            background: message.includes('successful')
                                ? 'rgba(30, 180, 120, 0.12)'
                                : 'rgba(255, 80, 80, 0.12)',
                            color: message.includes('successful')
                                ? '#72e0b2'
                                : '#ff9999',
                            border: message.includes('successful')
                                ? '1px solid rgba(30,180,120,0.3)'
                                : '1px solid rgba(255,80,80,0.3)'
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} autoComplete="off">

                        <label style={styles.label}>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            autoComplete="off"
                            readOnly
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            required
                        />

                        <label style={styles.label}>
                            Password
                        </label>

                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.passwordInput}
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readonly')}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.showButton}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.loginButton,
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login →'}
                        </button>

                    </form>

                    <p style={styles.registerText}>
                        Don't have an account?{' '}
                        <Link to="/register" style={styles.registerLink}>
                            Create Account
                        </Link>
                    </p>

                </div>
            </main>

            <footer style={styles.footer}>
                © 2026 CareerPath
            </footer>

        </div>
    );
}

const styles = {
    page: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#080d20',
        color: '#ffffff',
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
    },

    navbar: {
        height: '80px',
        flexShrink: 0,
        padding: '0 8%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0b1128',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
    },

    logo: {
        fontSize: '27px',
        fontWeight: '800',
        color: '#ffffff',
        textDecoration: 'none',
        letterSpacing: '-1px'
    },

    homeLink: {
        color: '#c3c9dc',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '600'
    },

    main: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '45px 20px',
        boxSizing: 'border-box',
        background: 'radial-gradient(ellipse at center, #20265b 0%, #101735 45%, #080d20 85%)'
    },

    loginCard: {
        width: '100%',
        maxWidth: '460px',
        boxSizing: 'border-box',
        padding: '42px',
        background: 'linear-gradient(145deg, #171f41, #111a35)',
        border: '1px solid rgba(177,168,255,0.22)',
        borderRadius: '17px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },

    headingSection: {
        textAlign: 'center',
        marginBottom: '30px'
    },

    welcome: {
        color: '#a99cff',
        fontSize: '12px',
        fontWeight: '800',
        letterSpacing: '2px',
        marginBottom: '15px'
    },

    heading: {
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: '800',
        margin: '0 0 12px'
    },

    description: {
        color: '#aeb8d0',
        fontSize: '14px',
        lineHeight: '1.7'
    },

    label: {
        display: 'block',
        color: '#dce2f5',
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '9px'
    },

    input: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '14px',
        border: '1px solid #343f68',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        marginBottom: '23px',
        background: '#0c1430',
        color: '#ffffff'
    },

    passwordContainer: {
        position: 'relative',
        marginBottom: '25px'
    },

    passwordInput: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '14px 65px 14px 14px',
        border: '1px solid #343f68',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        background: '#0c1430',
        color: '#ffffff'
    },

    showButton: {
        position: 'absolute',
        right: '13px',
        top: '13px',
        border: 'none',
        background: 'none',
        color: '#a99cff',
        cursor: 'pointer',
        fontWeight: '600'
    },

    loginButton: {
        width: '100%',
        padding: '15px',
        background: 'linear-gradient(100deg, #7565ed, #9180ff)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(117,101,237,0.2)'
    },

    message: {
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '13px'
    },

    registerText: {
        textAlign: 'center',
        color: '#aeb8d0',
        marginTop: '28px',
        fontSize: '13px'
    },

    registerLink: {
        color: '#a99cff',
        fontWeight: '700',
        textDecoration: 'none'
    },

    footer: {
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080d20',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        color: '#929db8',
        fontSize: '12px'
    }
};

export default Login;
