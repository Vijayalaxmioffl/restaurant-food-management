import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Sign Up Logic
      const existingUser = JSON.parse(localStorage.getItem("user"));
      if (existingUser && existingUser.email === email) {
        alert("User already exists! Please log in.");
      } else {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        alert("Signup successful! Please log in.");
        setIsSignup(false); // Switch to login after signup
      }
    } else {
      // Login Logic
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center">{isSignup ? "Sign Up" : "Login"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>
            <p className="text-center mt-3">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button className="btn btn-link" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
