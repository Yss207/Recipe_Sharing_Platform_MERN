import React, { useState } from "react";
import axios from "axios";
import "./InputForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer } from "react-bootstrap";

const Inputform = ({ setIsOpen }) => {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? "signUp" : "login";

    // Create request payload
    const payload = isSignUp
      ? { name, email, password } // Include name only for sign-up
      : { email, password };

    await axios
      .post(`http://localhost:5000/${endpoint}`, payload)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowToast(true);
        setTimeout(() => setIsOpen(), 2000); // Close modal after showing toast
      })
      .catch((data) => setError(data.response?.data?.error));
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">
            {isSignUp ? "Registered successfully!" : "Logged in successfully!"}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <form className="form" onSubmit={handleOnSubmit}>
        {/* === ADDING DYNAMIC TITLE HERE === */}
        <h2>{isSignUp ? "Register" : "Login"}</h2>
        {isSignUp && (
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-animated">
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <br />

        {error !== "" && <h6 className="error">{error}</h6>}

        <p onClick={() => setIsSignUp((prev) => !prev)}>
          <span>
            {isSignUp ? "Already have an account? Login" : "Create new account"}
          </span>
        </p>
      </form>
    </>
  );
};

export default Inputform;
