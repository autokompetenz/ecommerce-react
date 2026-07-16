import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(pin)) {
      navigate("/admin");
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleDigit = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (login(newPin)) {
          navigate("/admin");
        } else {
          setError(true);
          setTimeout(() => { setError(false); setPin(""); }, 1000);
        }
      }
    }
  };

  const handleDelete = () => setPin((prev) => prev.slice(0, -1));

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: "360px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "8px", color: "#333" }}>POWER Tools</h2>
        <p style={{ color: "#888", marginBottom: "30px", fontSize: "14px" }}>Espace Administration</p>

        {/* PIN display */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: "48px", height: "56px", borderRadius: "8px", border: error ? "2px solid #e74c3c" : "2px solid #ddd",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", fontWeight: "bold", color: "#333",
                background: pin.length > i ? (error ? "#fdecea" : "#f0f0f0") : "#fff",
                transition: "all 0.2s",
              }}
            >
              {pin.length > i ? "●" : ""}
            </div>
          ))}
        </div>

        {error && <p style={{ color: "#e74c3c", marginBottom: "16px", fontSize: "13px" }}>Code incorrect</p>}

        {/* Keypad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button key={d} onClick={() => handleDigit(String(d))}
              style={{ padding: "16px", fontSize: "20px", border: "1px solid #eee", borderRadius: "8px", background: "#fff", cursor: "pointer", fontWeight: "500" }}
              onMouseOver={(e) => e.target.style.background = "#f5f5f5"}
              onMouseOut={(e) => e.target.style.background = "#fff"}
            >
              {d}
            </button>
          ))}
          <button onClick={handleDelete}
            style={{ padding: "16px", fontSize: "16px", border: "1px solid #eee", borderRadius: "8px", background: "#fff", cursor: "pointer", color: "#e74c3c" }}
          >
            ←
          </button>
          <button onClick={() => handleDigit("0")}
            style={{ padding: "16px", fontSize: "20px", border: "1px solid #eee", borderRadius: "8px", background: "#fff", cursor: "pointer", fontWeight: "500" }}
          >
            0
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
