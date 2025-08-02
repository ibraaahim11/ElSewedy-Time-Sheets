import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      const data = await response.json();

      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("role", data.role);
      localStorage.setItem("empId", data.empId);

      setLoading(false);
      if (data.role === "Manager") {
        navigate("/manager-home");
      } else {
        navigate("/employee-home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const handleCapsLock = (e) => {
    const isCaps = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOn(isCaps);
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)",
          width: "100%",
          maxWidth: "400px",
          color: "white",
          border: "1px solid #007bff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#2c2c2c",
              color: "white",
              border: "1px solid #444",
              padding: "8px",
              borderRadius: "4px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleCapsLock}
              style={{
                width: "100%",
                backgroundColor: "#2c2c2c",
                color: "white",
                border: "1px solid #444",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                marginLeft: "-30px",
              }}
              tabIndex={-1}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        {capsLockOn && (
          <p style={{ color: "orange", fontSize: "12px" }}>
            ⚠️ Caps Lock is ON
          </p>
        )}

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          {loading ? "🔄 Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
