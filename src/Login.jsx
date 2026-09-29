import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    // Save login status
    localStorage.setItem("smartStudyLoggedIn", "true");
    localStorage.setItem("smartStudyUser", email);

    // Tell App.jsx that login was successful
   if (onLogin) {
  onLogin(email);
}
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-icon">
          🎓
        </div>

        <h1>Smart Study Planner</h1>

        <p className="login-subtitle">
          Sign in to manage your studies
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        <p className="login-demo">
          Demo: enter any email and password
        </p>

      </div>
    </div>
  );
}

export default Login;