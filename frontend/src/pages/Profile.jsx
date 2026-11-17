import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5001/api/profile";

const initialForm = {
  education: "",
  skills: "",
  interests: "",
};

const toText = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
};

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [originalData, setOriginalData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load profile");
      }

      const profile = data.profile || data.student || data;

      const loadedData = {
        education: profile.education || "",
        skills: toText(profile.skills),
        interests: toText(profile.interests),
      };

      setFormData(loadedData);
      setOriginalData(loadedData);
    } catch (error) {
      setMessage(error.message || "Error loading profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const updatedProfile = {
        education: formData.education,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: formData.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save profile");
      }

      const savedData = {
        education: updatedProfile.education,
        skills: updatedProfile.skills.join(", "),
        interests: updatedProfile.interests.join(", "),
      };

      setFormData(savedData);
      setOriginalData(savedData);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message || "Error saving profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditing(false);
    setMessage("");
  };

  const skillsList = formData.skills
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const interestsList = formData.interests
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (loading) {
    return <div style={styles.loading}>Loading your profile...</div>;
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
          <Link to="/profile" style={styles.activeLink}>
            My Profile
          </Link>
          <Link to="/careers" style={styles.navLink}>
            Careers
          </Link>
          <Link to="/jobs" style={styles.navLink}>
            Jobs
          </Link>
        </div>
      </nav>

      <main style={styles.container}>
        <div style={styles.heading}>
          <p style={styles.eyebrow}>STUDENT ACCOUNT</p>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>
            Build your professional profile and explore opportunities
            that match your skills and interests.
          </p>
        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <section style={styles.identityCard}>
          <div style={styles.identityDetails}>
            <h2 style={styles.studentName}>
              {user.name || "Student"}
            </h2>

            <p style={styles.email}>
              {user.email || "Student account"}
            </p>

            <span style={styles.studentLabel}>
              MCA STUDENT
            </span>
          </div>

          
        </section>

        <form onSubmit={handleSubmit}>
          <section style={styles.section}>
            <div style={styles.sectionHeading}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Academic Information
                </h2>
                <p style={styles.sectionDescription}>
                  Your educational background
                </p>
              </div>
            </div>

            <label style={styles.label}>Education</label>

            {editing ? (
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Enter your education"
                style={styles.input}
              />
            ) : (
              <div style={styles.valueBox}>
                {formData.education || "No education added yet"}
              </div>
            )}
          </section>

          <section style={styles.section}>
            <div style={styles.sectionHeading}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Technical Skills
                </h2>
                <p style={styles.sectionDescription}>
                  Technologies and skills you have learned
                </p>
              </div>
            </div>

            {editing ? (
              <>
                <label style={styles.label}>Your Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Example: Java, HTML, CSS, JavaScript, SQL, MongoDB"
                  rows="3"
                  style={styles.textarea}
                />
                <p style={styles.hint}>
                  Separate each skill with a comma.
                </p>
              </>
            ) : (
              <div style={styles.tags}>
                {skillsList.length > 0 ? (
                  skillsList.map((skill, index) => (
                    <span key={index} style={styles.tag}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p style={styles.emptyText}>
                    No skills added yet.
                  </p>
                )}
              </div>
            )}
          </section>

          <section style={styles.section}>
            <div style={styles.sectionHeading}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Career Interests
                </h2>
                <p style={styles.sectionDescription}>
                  Areas you are interested in working
                </p>
              </div>
            </div>

            {editing ? (
              <>
                <label style={styles.label}>Your Interests</label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Example: Web development, Software Testing"
                  rows="3"
                  style={styles.textarea}
                />
                <p style={styles.hint}>
                  Separate each interest with a comma.
                </p>
              </>
            ) : (
              <div style={styles.tags}>
                {interestsList.length > 0 ? (
                  interestsList.map((interest, index) => (
                    <span key={index} style={styles.tag}>
                      {interest}
                    </span>
                  ))
                ) : (
                  <p style={styles.emptyText}>
                    No interests added yet.
                  </p>
                )}
              </div>
            )}
          </section>

          <div style={styles.actions}>
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={styles.cancelButton}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={styles.saveButton}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditing(true);
                  setMessage("");
                }}
                style={styles.saveButton}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </main>

      <footer style={styles.footer}>
        © 2026 CareerPath. Build your future with confidence.
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

  container: {
    width: "min(850px, 90%)",
    margin: "0 auto",
    padding: "55px 0 70px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "35px",
  },

  eyebrow: {
    color: "#a99cff",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "3px",
    marginBottom: "12px",
  },

  title: {
    fontSize: "36px",
    color: "#d8d0ff",
    marginBottom: "12px",
  },

  subtitle: {
    color: "#aeb8d0",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  message: {
    padding: "13px 18px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#171f41",
    color: "#d8d0ff",
    border: "1px solid #354267",
    textAlign: "center",
  },

  identityCard: {
    background: "#111a35",
    border: "1px solid #293456",
    borderRadius: "16px",
    padding: "25px",
    display: "grid",
    gridTemplateColumns: "1fr 65px",
    alignItems: "center",
    marginBottom: "25px",
  },

  identityDetails: {
    textAlign: "center",
  },

  avatar: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#7565ed",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "27px",
    fontWeight: "bold",
    flexShrink: 0,
  },

  studentName: {
    fontSize: "21px",
    color: "#ffffff",
    marginBottom: "6px",
    fontWeight: "bold",
  },

  email: {
    color: "#aeb8d0",
    fontSize: "14px",
    marginBottom: "9px",
  },

  studentLabel: {
    color: "#a99cff",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "bold",
  },

  section: {
    background: "#111a35",
    border: "1px solid #293456",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "20px",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  sectionTitle: {
    fontSize: "19px",
    color: "#ffffff",
    marginBottom: "7px",
  },

  sectionDescription: {
    fontSize: "13px",
    color: "#aeb8d0",
  },

  label: {
    display: "block",
    color: "#d8d0ff",
    fontSize: "13px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #354267",
    background: "#0c1430",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #354267",
    background: "#0c1430",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },

  hint: {
    color: "#8995b3",
    fontSize: "12px",
    marginTop: "9px",
  },

  valueBox: {
    padding: "14px",
    borderRadius: "9px",
    background: "#0c1430",
    border: "1px solid #293456",
    color: "#d8d0ff",
    fontSize: "14px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  tag: {
    background: "#252653",
    border: "1px solid #5146a2",
    color: "#d8d0ff",
    padding: "9px 15px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  emptyText: {
    color: "#8995b3",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },

  saveButton: {
    background: "#7565ed",
    color: "#ffffff",
    border: "none",
    borderRadius: "9px",
    padding: "13px 28px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  cancelButton: {
    background: "transparent",
    color: "#d8d0ff",
    border: "1px solid #5146a2",
    borderRadius: "9px",
    padding: "13px 28px",
    fontSize: "14px",
    cursor: "pointer",
  },

  footer: {
    borderTop: "1px solid #293456",
    padding: "22px",
    textAlign: "center",
    color: "#8995b3",
    fontSize: "12px",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#080d20",
    color: "#d8d0ff",
    fontSize: "18px",
  },
};

export default Profile;
