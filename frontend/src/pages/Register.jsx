
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#080d20",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 20px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "440px",
      background: "#111a35",
      border: "1px solid #293456",
      borderRadius: "18px",
      padding: "38px",
      boxShadow: "0 15px 50px rgba(0,0,0,0.35)",
    },
    logo: {
      textAlign: "center",
      fontSize: "25px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    heading: {
      textAlign: "center",
      fontSize: "30px",
      color: "#ffffff",
      marginBottom: "12px",
    },
    description: {
      textAlign: "center",
      color: "#aeb8d0",
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "28px",
    },
    label: {
      display: "block",
      color: "#d8d0ff",
      fontSize: "14px",
      marginBottom: "9px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "14px",
      background: "#0b1128",
      border: "1px solid #354267",
      borderRadius: "9px",
      color: "#ffffff",
      fontSize: "15px",
      outline: "none",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "15px",
      background: "linear-gradient(90deg, #7565ed, #9880ff)",
      border: "none",
      borderRadius: "9px",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "8px",
    },
    footer: {
      textAlign: "center",
      color: "#aeb8d0",
      fontSize: "14px",
      marginTop: "24px",
    },
    error: {
      color: "#ff8585",
      fontSize: "14px",
      marginBottom: "15px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          Career<span style={{ color: "#9880ff" }}>Path.</span>
        </div>

        <h1 style={styles.heading}>Create Your Account</h1>

        <p style={styles.description}>
          Start discovering career opportunities that match your skills
          and interests.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            readOnly
            onFocus={(e) => e.target.removeAttribute("readonly")}
            required
          />

          <label style={styles.label}>Password</label>

          <div style={{ position: "relative" }}>
            <input
              style={{ ...styles.input, paddingRight: "75px" }}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readonly")}
              required
              minLength={6}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "13px",
                background: "none",
                border: "none",
                color: "#a99cff",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#a99cff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>

        <p
          style={{
            textAlign: "center",
            color: "#7885a5",
            fontSize: "12px",
            marginTop: "30px",
          }}
        >
          © 2026 CareerPath
        </p>
      </div>
    </div>
  );
}

export default Register;
