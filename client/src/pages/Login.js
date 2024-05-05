import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <div className="loginBG">
        <div className="accountPage">
          <form className="account" onSubmit={handleSubmit} name="formLogin">
            <h1>Login</h1>

            <div className="form-input-box">
              <input
                name="loginEmail"
                type="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-input-box">
              <input
                name="loginPassword"
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}

            <div className="register-link">
              <p>
                Don't have an account?
                <br />
                <Link to="/signup">Signup</Link>
              </p>
            </div>

            <div className="register-link">
              <p>
                <Link to="/login">Forgot password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
