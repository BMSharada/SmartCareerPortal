
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!token || !savedUser) {
            navigate("/login");
            return;
        }

        try {
            setUser(JSON.parse(savedUser));
        } catch {
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const navLink = {
        color: "#dce2f5",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600"
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#080d20",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            flexDirection: "column"
        }}>

            {/* Navigation */}
            <header style={{
                minHeight: "80px",
                padding: "0 7%",
                background: "#0b1128",
                borderBottom: "1px solid #293456",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "15px"
            }}>

                <Link to="/dashboard" style={{
                    color: "#ffffff",
                    fontSize: "26px",
                    fontWeight: "800",
                    textDecoration: "none"
                }}>
                    Career<span style={{ color: "#9180ff" }}>Path.</span>
                </Link>

                <nav style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "22px",
                    flexWrap: "wrap"
                }}>
                    <Link to="/dashboard" style={navLink}>
                        Dashboard
                    </Link>

                    <Link to="/profile" style={navLink}>
                        My Profile
                    </Link>

                    <Link to="/careers" style={navLink}>
                        Careers
                    </Link>

                    <Link to="/jobs" style={navLink}>
                        Jobs
                    </Link>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: "#7565ed",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "7px",
                            padding: "10px 19px",
                            fontWeight: "700",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </header>

            {/* Welcome Section */}
            <main style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "50px 20px"
            }}>

                <p style={{
                    color: "#a99cff",
                    fontSize: "13px",
                    fontWeight: "800",
                    letterSpacing: "3px",
                    marginBottom: "22px"
                }}>
                    WELCOME TO CAREERPATH
                </p>

                <h1 style={{
                    fontSize: "clamp(34px, 6vw, 58px)",
                    lineHeight: "1.4",
                    fontWeight: "800",
                    margin: "0"
                }}>
                    <span style={{ color: "#d8d0ff" }}>
                        Welcome back,
                    </span>
                    <br />
                    <span style={{
                        background: "linear-gradient(90deg, #9180ff, #d1aaff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        {user?.name || "Student"}!
                    </span>
                </h1>

                <p style={{
                    maxWidth: "550px",
                    color: "#aeb8d0",
                    fontSize: "16px",
                    lineHeight: "1.8",
                    marginTop: "22px"
                }}>
                    Every great career begins with a single step.
                    Continue exploring your potential and building
                    the future you want.
                </p>

            </main>

            {/* Footer */}
            <footer style={{
                textAlign: "center",
                padding: "22px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                color: "#929db8",
                fontSize: "12px"
            }}>
                © 2026 CareerPath · Build your skills. Shape your future.
            </footer>

        </div>
    );
}

export default Dashboard;
