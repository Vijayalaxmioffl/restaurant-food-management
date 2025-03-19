import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //Checks whether the form is in signup or login mode.
  const handleSubmit = (e) => {
    //method in JavaScript that prevents the default behavior of an event in this case,
    //pg refreshing
    e.preventDefault();

    if (isSignup) {
      // Sign Up Logic
      const existingUser = JSON.parse(localStorage.getItem("user"));
      if (existingUser && existingUser.email === email) {
        toast.error("User already exists! Please log in.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        toast.success("Signup successful! Please log in.", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsSignup(false); // Switch to login after signup
      }
    } else {
      // Login Logic
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        //Stores "isAuthenticated": "true" in localStorage.Navigates to "/customer/list"
        localStorage.setItem("isAuthenticated", "true");
        navigate("/customer/list");
      } else {
        toast.error("Invalid credentials. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
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
                {/* toggled when the user clicks on the "Don't have an account? Sign Up" or "Already have an account? Login" button */}
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
      <ToastContainer />
    </div>
  );
};

export default Login;
