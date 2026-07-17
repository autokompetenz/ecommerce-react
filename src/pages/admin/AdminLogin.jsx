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
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>POWER Tools</h2>
        <p className="admin-login-subtitle">Espace Administration</p>

        {/* PIN display */}
        <div className="admin-pin-display">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`admin-pin-dot ${pin.length > i ? "filled" : ""} ${error ? "error" : ""}`}
            >
              {pin.length > i ? "●" : ""}
            </div>
          ))}
        </div>

        {error && <p className="admin-pin-error">Code incorrect</p>}

        {/* Keypad */}
        <div className="admin-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button key={d} onClick={() => handleDigit(String(d))} className="admin-keypad-btn">
              {d}
            </button>
          ))}
          <button onClick={handleDelete} className="admin-keypad-btn admin-keypad-delete">
            <i className="fa-solid fa-delete-left"></i>
          </button>
          <button onClick={() => handleDigit("0")} className="admin-keypad-btn">
            0
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
