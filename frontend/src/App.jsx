
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Careers from './pages/Careers';
import Jobs from './pages/Jobs';

import './App.css';

function Home() {
    return (
        <div style={styles.page}>

            {/* Navigation */}
            <nav style={styles.navbar}>
                <Link to="/" style={styles.logo}>
                    Career<span style={{ color: '#9180ff' }}>Path.</span>
                </Link>

                <Link to="/login" style={styles.login}>
                    Login
                </Link>
            </nav>

            {/* Centered Hero Section */}
            <main style={styles.hero}>
                <div style={styles.content}>

                    <p style={styles.welcome}>
                        WELCOME TO CAREERPATH
                    </p>

                    <h1 style={styles.heading}>
                        Make Your Next
                        <br />
                        Career Move
                    </h1>

                    <p style={styles.description}>
                        Discover career paths and job opportunities
                        that match your education, skills and interests.
                        Get personalized career recommendations and
                        take the next step towards your future.
                    </p>

                    <Link to="/register" style={styles.button}>
                        Get Started →
                    </Link>

                </div>
            </main>

            {/* Footer */}
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
        width: '100%',
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

    login: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: '600'
    },

    hero: {
        width: '100%',
        flex: '1',
        minHeight: 'calc(100vh - 130px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '50px 20px',
        background: 'radial-gradient(ellipse at center, #20265b 0%, #101735 45%, #080d20 85%)'
    },

    content: {
        width: '100%',
        maxWidth: '750px',
        margin: '0 auto'
    },

    welcome: {
        color: '#a99cff',
        fontSize: '13px',
        fontWeight: '800',
        letterSpacing: '2px',
        marginBottom: '25px'
    },

    heading: {
        fontSize: 'clamp(42px, 6vw, 72px)',
        lineHeight: '1.2',
        letterSpacing: '-2px',
        fontWeight: '800',
        color: '#ffffff',
        margin: '0 0 25px'
    },

    description: {
        color: '#b4bdd3',
        fontSize: '17px',
        lineHeight: '1.9',
        maxWidth: '620px',
        margin: '0 auto 35px'
    },

    button: {
        display: 'inline-block',
        background: 'linear-gradient(100deg, #7565ed, #9180ff)',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '16px 30px',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '15px',
        boxShadow: '0 8px 25px rgba(117,101,237,0.25)'
    },

    footer: {
        width: '100%',
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/jobs" element={<Jobs />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
