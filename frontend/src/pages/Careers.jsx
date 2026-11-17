
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Careers() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedCareer, setExpandedCareer] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchCareers = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/careers",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to load recommendations"
                    );
                }

                setCareers(data.recommendations || []);
            } catch (err) {
                console.error("CAREER FETCH ERROR:", err);
                setError(err.message || "Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, [token, navigate]);

    const careerDetails = {
        "Software Developer": {
            icon: "💻",
            category: "Software Engineering",
            roadmap: [
                "Learn Java or Python",
                "Master Data Structures and Algorithms",
                "Learn SQL and DBMS",
                "Build real-world projects",
            ],
        },
        "Frontend Developer": {
            icon: "🌐",
            category: "Web Development",
            roadmap: [
                "Learn HTML and CSS",
                "Master JavaScript",
                "Learn React.js",
                "Build responsive websites",
            ],
        },
        "Database Developer": {
            icon: "🗄️",
            category: "Database Technology",
            roadmap: [
                "Learn SQL fundamentals",
                "Practice MySQL",
                "Understand database design",
                "Learn MongoDB",
            ],
        },
        "Software Tester": {
            icon: "🧪",
            category: "Software Quality",
            roadmap: [
                "Learn software testing concepts",
                "Practice test cases",
                "Learn SQL testing",
                "Explore Selenium",
            ],
        },
        "Machine Learning Engineer": {
            icon: "🤖",
            category: "Artificial Intelligence",
            roadmap: [
                "Learn Python",
                "Study mathematics and statistics",
                "Learn machine learning algorithms",
                "Build ML projects",
            ],
        },
        "Data Analyst": {
            icon: "📊",
            category: "Data Science",
            roadmap: [
                "Learn Python and SQL",
                "Study statistics",
                "Practice Excel and Power BI",
                "Build data analysis projects",
            ],
        },
        "AI Engineer": {
            icon: "🧠",
            category: "Artificial Intelligence",
            roadmap: [
                "Learn Python",
                "Study machine learning",
                "Explore deep learning",
                "Build AI applications",
            ],
        },
    };

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loading}>
                    Finding career opportunities for you...
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <nav style={styles.navbar}>
                <Link to="/dashboard" style={styles.logo}>
                    CareerPath<span style={styles.logoDot}>.</span>
                </Link>

                <div style={styles.navLinks}>
                    <Link to="/dashboard" style={styles.navLink}>
                        Dashboard
                    </Link>

                    <Link to="/profile" style={styles.navLink}>
                        My Profile
                    </Link>

                    <Link to="/careers" style={styles.activeLink}>
                        Careers
                    </Link>

                    <Link to="/jobs" style={styles.navLink}>
                        Jobs
                    </Link>
                </div>
            </nav>

            <main style={styles.main}>
                <header style={styles.header}>
                    <p style={styles.eyebrow}>
                        YOUR FUTURE, YOUR CHOICE
                    </p>

                    <h1 style={styles.heading}>
                        Discover Your Career Path
                    </h1>

                    <p style={styles.subtitle}>
                        Explore professional opportunities that match
                        your skills and interests.
                    </p>
                </header>

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}


                {!error && careers.length === 0 && (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>🔎</div>

                        <h2 style={styles.emptyTitle}>
                            No recommendations available
                        </h2>

                        <p style={styles.subtitle}>
                            Add your skills and interests to discover
                            suitable career opportunities.
                        </p>

                        <Link to="/profile" style={styles.primaryButton}>
                            Update My Profile
                        </Link>
                    </div>
                )}

                {!error && careers.length > 0 && (
                    <>
                        <div style={styles.sectionHeading}>
                            <h2>Recommended Career Options</h2>

                            <p style={styles.subtitle}>
                                Your personalized career matches.
                            </p>
                        </div>

                        <div style={styles.grid}>
                            {careers.map((career) => {
                                const details = careerDetails[career.title] || {
                                    icon: "💼",
                                    category: "Technology",
                                    roadmap: [
                                        "Learn the fundamentals",
                                        "Practice technical skills",
                                        "Build practical projects",
                                        "Prepare for interviews",
                                    ],
                                };

                                const isExpanded =
                                    expandedCareer === career.title;

                                const matchScore = Math.min(
                                    Math.max(
                                        Number(career.matchScore) || 0,
                                        0
                                    ),
                                    100
                                );

                                const matchedSkills =
                                    career.matchedSkills || [];

                                const matchedInterests =
                                    career.matchedInterests || [];

                                return (
                                    <article
                                        key={career.title}
                                        style={styles.card}
                                    >
                                        <div style={styles.cardTop}>
                                            <div style={styles.careerIcon}>
                                                {details.icon}
                                            </div>

                                            <span style={styles.category}>
                                                {details.category}
                                            </span>
                                        </div>

                                        <h2 style={styles.careerTitle}>
                                            {career.title}
                                        </h2>

                                        <p style={styles.description}>
                                            {career.description}
                                        </p>

                                        <div style={styles.matchBox}>
                                            <div style={styles.matchHeader}>
                                                <span>Career Match</span>

                                                <strong>
                                                    {matchScore}%
                                                </strong>
                                            </div>

                                            <div style={styles.progressBackground}>
                                                <div
                                                    style={{
                                                        ...styles.progressFill,
                                                        width: `${matchScore}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={styles.matchSection}>
                                            <h4 style={styles.subHeading}>
                                                Your Matching Skills
                                            </h4>

                                            <div style={styles.tags}>
                                                {matchedSkills.length > 0 ? (
                                                    matchedSkills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                style={styles.tag}
                                                            >
                                                                {skill}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span style={styles.noMatch}>
                                                        No matching skills yet
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={styles.matchSection}>
                                            <h4 style={styles.subHeading}>
                                                Your Matching Interests
                                            </h4>

                                            <div style={styles.tags}>
                                                {matchedInterests.length > 0 ? (
                                                    matchedInterests.map(
                                                        (interest, index) => (
                                                            <span
                                                                key={index}
                                                                style={styles.tag}
                                                            >
                                                                {interest}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span style={styles.noMatch}>
                                                        No matching interests yet
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={styles.matchSection}>
                                            <h4 style={styles.subHeading}>
                                                Required Skills
                                            </h4>

                                            <div style={styles.tags}>
                                                {(career.requiredSkills || []).map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            style={styles.tag}
                                                        >
                                                            {skill}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div style={styles.roadmap}>
                                                <h3 style={styles.roadmapTitle}>
                                                    Suggested Learning Roadmap
                                                </h3>

                                                {details.roadmap.map(
                                                    (step, index) => (
                                                        <div
                                                            key={index}
                                                            style={styles.roadmapStep}
                                                        >
                                                            <span style={styles.stepNumber}>
                                                                {index + 1}
                                                            </span>

                                                            <span>{step}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            style={styles.detailsButton}
                                            onClick={() =>
                                                setExpandedCareer(
                                                    isExpanded
                                                        ? null
                                                        : career.title
                                                )
                                            }
                                        >
                                            {isExpanded
                                                ? "Hide Learning Roadmap ↑"
                                                : "Explore Career →"}
                                        </button>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}

                <section style={styles.bottomCard}>
                    <div style={styles.bottomContent}>
                        <h2 style={styles.bottomHeading}>
                            Every skill takes you one step forward.
                        </h2>

                        <p style={styles.bottomText}>
                            Update your profile regularly to discover
                            new career paths.
                        </p>
                    </div>

                    <Link to="/profile" style={styles.bottomButton}>
                        Update My Profile →
                    </Link>
                </section>
            </main>

            <footer style={styles.footer}>
                © 2026 CareerPath. All Rights Reserved.
            </footer>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#080d20",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
    },

    navbar: {
        minHeight: "75px",
        padding: "15px 7%",
        background: "#0b1128",
        borderBottom: "1px solid #293456",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
    },

    logo: {
        color: "#ffffff",
        fontSize: "25px",
        fontWeight: "bold",
        textDecoration: "none",
    },

    logoDot: {
        color: "#9180ff",
    },

    navLinks: {
        display: "flex",
        alignItems: "center",
        gap: "25px",
        flexWrap: "wrap",
    },

    navLink: {
        color: "#aeb8d0",
        textDecoration: "none",
        fontSize: "14px",
    },

    activeLink: {
        color: "#a99cff",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "bold",
    },

    main: {
        width: "90%",
        maxWidth: "1150px",
        margin: "45px auto",
    },

    loading: {
        textAlign: "center",
        padding: "100px 20px",
        color: "#a99cff",
        fontSize: "18px",
    },

    header: {
        textAlign: "center",
        marginBottom: "35px",
    },

    eyebrow: {
        color: "#a99cff",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "2px",
    },

    heading: {
        fontSize: "34px",
        color: "#d8d0ff",
        margin: "12px 0",
    },

    subtitle: {
        color: "#aeb8d0",
        lineHeight: "1.7",
        fontSize: "14px",
    },

    summary: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(120deg, #252653, #5146a2)",
        color: "#ffffff",
        padding: "28px 32px",
        borderRadius: "16px",
        marginBottom: "40px",
        border: "1px solid #5146a2",
    },

    summaryLabel: {
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "1.5px",
    },

    summaryNumber: {
        fontSize: "42px",
        fontWeight: "bold",
        color: "#ffffff",
        margin: "10px 0",
        lineHeight: "1.2",
        display: "block",
        visibility: "visible",
    },

    summaryText: {
        color: "#ffffff",
        margin: 0,
        fontSize: "14px",
    },

    summaryEmoji: {
        fontSize: "45px",
    },

    sectionHeading: {
        marginBottom: "22px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "22px",
    },

    card: {
        background: "#111a35",
        border: "1px solid #293456",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
    },

    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        marginBottom: "18px",
    },

    careerIcon: {
        width: "54px",
        height: "54px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#252653",
        borderRadius: "14px",
        fontSize: "28px",
    },

    category: {
        color: "#a99cff",
        fontSize: "12px",
        fontWeight: "bold",
        textAlign: "right",
    },

    careerTitle: {
        fontSize: "21px",
        margin: "10px 0",
        color: "#ffffff",
    },

    description: {
        color: "#aeb8d0",
        lineHeight: "1.7",
        fontSize: "14px",
        minHeight: "70px",
    },

    matchBox: {
        background: "#0c1430",
        border: "1px solid #293456",
        padding: "15px",
        borderRadius: "10px",
        marginTop: "12px",
    },

    matchHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        fontWeight: "bold",
        fontSize: "13px",
        color: "#d8d0ff",
    },

    progressBackground: {
        height: "9px",
        background: "#293456",
        borderRadius: "10px",
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        background: "#9180ff",
        borderRadius: "10px",
        transition: "width 0.4s ease",
    },

    matchSection: {
        marginTop: "17px",
    },

    subHeading: {
        fontWeight: "bold",
        fontSize: "13px",
        marginTop: "12px",
        marginBottom: "12px",
        color: "#d8d0ff",
    },

    tags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
    },

    tag: {
        background: "#252653",
        border: "1px solid #5146a2",
        color: "#d8d0ff",
        padding: "7px 11px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },

    noMatch: {
        color: "#8995b3",
        fontSize: "12px",
    },

    detailsButton: {
        width: "100%",
        padding: "13px 8px",
        marginTop: "22px",
        background: "#7565ed",
        color: "#ffffff",
        border: "none",
        borderRadius: "9px",
        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
    },

    roadmap: {
        background: "#0c1430",
        border: "1px solid #293456",
        padding: "17px",
        borderRadius: "10px",
        marginTop: "20px",
    },

    roadmapTitle: {
        fontSize: "14px",
        color: "#d8d0ff",
        margin: "0 0 15px",
    },

    roadmapStep: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "13px",
        color: "#aeb8d0",
        marginBottom: "12px",
        lineHeight: "1.5",
    },

    stepNumber: {
        minWidth: "28px",
        width: "28px",
        height: "28px",
        flexShrink: 0,
        borderRadius: "50%",
        background: "#5146a2",
        border: "1px solid #9180ff",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "13px",
    },

    empty: {
        background: "#111a35",
        border: "1px solid #293456",
        borderRadius: "15px",
        padding: "45px 20px",
        textAlign: "center",
    },

    emptyIcon: {
        fontSize: "48px",
        marginBottom: "15px",
    },

    emptyTitle: {
        color: "#ffffff",
        marginBottom: "12px",
    },

    primaryButton: {
        display: "inline-block",
        background: "#7565ed",
        color: "#ffffff",
        padding: "13px 22px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        marginTop: "15px",
    },

    error: {
        color: "#ff9999",
        background: "#351c30",
        border: "1px solid #75405e",
        borderRadius: "10px",
        textAlign: "center",
        padding: "18px",
        marginBottom: "20px",
    },

    bottomCard: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        background: "#111a35",
        border: "1px solid #5146a2",
        borderRadius: "16px",
        padding: "30px",
        marginTop: "40px",
    },

    bottomContent: {
        flex: "1 1 300px",
    },

    bottomHeading: {
        color: "#d8d0ff",
        fontSize: "21px",
        lineHeight: "1.5",
    },

    bottomText: {
        margin: "10px 0 0",
        color: "#c4cce0",
        lineHeight: "1.7",
        fontSize: "14px",
    },

    bottomButton: {
        background: "#7565ed",
        color: "#ffffff",
        padding: "13px 20px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },

    footer: {
        borderTop: "1px solid #293456",
        textAlign: "center",
        padding: "25px",
        color: "#8995b3",
        fontSize: "13px",
    },
};

export default Careers;
