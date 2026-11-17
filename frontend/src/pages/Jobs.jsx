import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Jobs() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState("Loading job recommendations...");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            if (!token || !user?.id) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:5001/api/jobs/recommend/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setJobs(data.jobs || []);
                    setMessage(data.message || "");
                } else {
                    setError(data.message || "Unable to load jobs");
                }
            } catch (err) {
                console.error("JOB FETCH ERROR:", err);
                setError("Server connection failed");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [navigate]);

    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.loading}>
                    Loading job recommendations...
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

                    <Link to="/careers" style={styles.navLink}>
                        Careers
                    </Link>

                    <Link to="/jobs" style={styles.activeLink}>
                        Jobs
                    </Link>
                </div>
            </nav>

            <main style={styles.main}>
                <header style={styles.header}>
                    <div>
                        <p style={styles.eyebrow}>
                            YOUR NEXT OPPORTUNITY
                        </p>

                        <h1 style={styles.heading}>
                            Job Recommendations
                        </h1>

                        <p style={styles.subtitle}>
                            Explore job roles that match your skills and interests.
                        </p>
                    </div>
                </header>

        
                {error && (
                    <div style={styles.error}>
                        <h2>Unable to load jobs</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!error && jobs.length === 0 && (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>🔍</div>

                        <h2 style={styles.emptyTitle}>
                            No Matching Jobs Found
                        </h2>

                        <p style={styles.subtitle}>
                            {message ||
                                "Update your profile with more skills to discover matching jobs."}
                        </p>

                        <Link to="/profile" style={styles.primaryButton}>
                            Update My Skills
                        </Link>
                    </div>
                )}

                {!error && jobs.length > 0 && (
                    <>
                        <div style={styles.sectionHeading}>
                            <h2>Recommended Roles</h2>

                            <p style={styles.subtitle}>
                                Compare your skills with the requirements of each role.
                            </p>
                        </div>

                        <div style={styles.grid}>
                            {jobs.map((job) => {
                                const matchPercentage = Math.min(
                                    Math.max(
                                        Number(job.matchPercentage) || 0,
                                        0
                                    ),
                                    100
                                );

                                const jobTitle = job.title || "Job Opportunity";

                                return (
                                    <article
                                        key={job._id}
                                        style={styles.jobCard}
                                    >
                                        <div style={styles.cardTop}>
                                            <span style={styles.roleLabel}>
                                                RECOMMENDED ROLE
                                            </span>

                                            <span style={styles.matchBadge}>
                                                {matchPercentage}% Match
                                            </span>
                                        </div>

                                        <h2 style={styles.jobTitle}>
                                            {jobTitle}
                                        </h2>

                                        <p style={styles.description}>
                                            {job.description}
                                        </p>

                                        <div style={styles.progressSection}>
                                            <div style={styles.progressHeader}>
                                                <span>Skill Match</span>
                                                <strong>{matchPercentage}%</strong>
                                            </div>

                                            <div style={styles.progressBackground}>
                                                <div
                                                    style={{
                                                        ...styles.progressFill,
                                                        width: `${matchPercentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={styles.skillSection}>
                                            <h4 style={styles.skillHeading}>
                                                Required Skills
                                            </h4>

                                            <div style={styles.tags}>
                                                {(job.skills || []).map(
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

                                        <div style={styles.skillSection}>
                                            <h4 style={styles.skillHeading}>
                                                Your Matching Skills
                                            </h4>

                                            <div style={styles.tags}>
                                                {(job.matchedSkills || []).length > 0 ? (
                                                    job.matchedSkills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                style={styles.matchedTag}
                                                            >
                                                                ✓ {skill}
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

                                        <div style={styles.cardFooter}>
                                            <span style={styles.category}>
                                                {job.category || "Technology"}
                                            </span>

                                            <span style={styles.matchText}>
                                                {job.matchedSkills?.length || 0} skills matched
                                            </span>
                                        </div>

                                        <div style={styles.jobSearch}>
                                            <p style={styles.searchLabel}>
                                                FIND LIVE JOB OPENINGS
                                            </p>

                                            <div style={styles.searchButtons}>
                                                <a
                                                    href={`https://in.indeed.com/jobs?q=${encodeURIComponent(jobTitle)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.indeedButton}
                                                >
                                                    Indeed →
                                                </a>

                                                <a
                                                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobTitle)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.linkedinButton}
                                                >
                                                    LinkedIn →
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}

                <section style={styles.bottomCard}>
                    <div>
                        <h2 style={styles.bottomHeading}>
                            Improve Your Job Matches
                        </h2>

                        <p style={styles.bottomText}>
                            Add more technical skills to your profile to discover
                            additional career opportunities.
                        </p>
                    </div>

                    <Link to="/profile" style={styles.bottomButton}>
                        Update Profile →
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
        marginBottom: "30px",
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
        margin: "10px 0",
    },

    subtitle: {
        color: "#aeb8d0",
        fontSize: "14px",
        lineHeight: "1.7",
    },

    summary: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(120deg, #252653, #5146a2)",
        padding: "26px 30px",
        borderRadius: "15px",
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
    },

    summaryText: {
        color: "#ffffff",
        fontSize: "14px",
    },

    summaryIcon: {
        fontSize: "40px",
    },

    sectionHeading: {
        marginBottom: "22px",
    },

    sectionHeadingTitle: {
        color: "#ffffff",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "22px",
        alignItems: "stretch",
    },

    jobCard: {
        background: "#111a35",
        border: "1px solid #293456",
        borderRadius: "15px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
    },

    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },

    roleLabel: {
        color: "#a99cff",
        fontSize: "10px",
        fontWeight: "bold",
        letterSpacing: "1px",
    },

    matchBadge: {
        background: "#252653",
        border: "1px solid #5146a2",
        color: "#d8d0ff",
        padding: "7px 11px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },

    jobTitle: {
        fontSize: "21px",
        color: "#ffffff",
        margin: "0 0 12px",
        lineHeight: "1.4",
    },

    description: {
        color: "#aeb8d0",
        fontSize: "13px",
        lineHeight: "1.7",
        minHeight: "44px",
        margin: "0 0 15px",
    },

    progressSection: {
        marginTop: "8px",
    },

    progressHeader: {
        display: "flex",
        justifyContent: "space-between",
        color: "#d8d0ff",
        fontSize: "12px",
        marginBottom: "10px",
    },

    progressBackground: {
        width: "100%",
        height: "7px",
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

    skillSection: {
        marginTop: "22px",
    },

    skillHeading: {
        fontSize: "13px",
        color: "#d8d0ff",
        marginBottom: "12px",
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
        padding: "7px 10px",
        borderRadius: "7px",
        fontSize: "11px",
        fontWeight: "600",
    },

    matchedTag: {
        background: "#252653",
        border: "1px solid #5146a2",
        color: "#d8d0ff",
        padding: "7px 10px",
        borderRadius: "7px",
        fontSize: "11px",
        fontWeight: "600",
    },

    noMatch: {
        color: "#8995b3",
        fontSize: "12px",
    },

    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        borderTop: "1px solid #293456",
        marginTop: "22px",
        paddingTop: "15px",
    },

    category: {
        color: "#a99cff",
        fontSize: "12px",
        fontWeight: "bold",
    },

    matchText: {
        color: "#aeb8d0",
        fontSize: "11px",
    },

    jobSearch: {
        marginTop: "20px",
        paddingTop: "17px",
        borderTop: "1px solid #293456",
    },

    searchLabel: {
        color: "#8995b3",
        fontSize: "10px",
        fontWeight: "bold",
        letterSpacing: "1px",
        marginBottom: "12px",
    },

    searchButtons: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
    },

    indeedButton: {
        flex: 1,
        textAlign: "center",
        background: "#7565ed",
        color: "#ffffff",
        padding: "11px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: "bold",
    },

    linkedinButton: {
        flex: 1,
        textAlign: "center",
        background: "#252653",
        color: "#d8d0ff",
        border: "1px solid #5146a2",
        padding: "11px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: "bold",
    },

    empty: {
        background: "#111a35",
        border: "1px solid #293456",
        borderRadius: "15px",
        padding: "45px 20px",
        textAlign: "center",
    },

    emptyIcon: {
        fontSize: "45px",
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
        padding: "25px",
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
        borderRadius: "15px",
        padding: "28px",
        marginTop: "40px",
    },

    bottomHeading: {
        margin: "0 0 10px",
        color: "#d8d0ff",
        fontSize: "20px",
    },

    bottomText: {
        margin: 0,
        color: "#c4cce0",
        lineHeight: "1.7",
        fontSize: "13px",
    },

    bottomButton: {
        background: "#7565ed",
        color: "#ffffff",
        padding: "12px 18px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        fontSize: "13px",
    },

    footer: {
        borderTop: "1px solid #293456",
        textAlign: "center",
        padding: "25px",
        color: "#8995b3",
        fontSize: "13px",
    },
};

export default Jobs;