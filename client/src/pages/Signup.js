import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setGoal] = useState("Lose Weight");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, email, password, height, weight, fitnessGoal);

    await signup(name, email, password, height, weight, fitnessGoal);
  };

  return (
    <div className="signupBG">
      <div className="accountPage">
        <form className="account" onSubmit={handleSubmit} name="signupForm">
          <h1>Sign up</h1>

          <div className="form-input-box">
            <input
              name="signupName"
              type="text"
              placeholder="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-input-box">
            <input
              name="signupEmail"
              type="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-input-box">
            <input
              name="signupPassword"
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="form-input-box">
            <input
              name="signupHeight"
              type="number"
              placeholder="height in inches"
              required
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </div>

          <div className="form-input-box">
            <input
              name="signupWeight"
              type="number"
              placeholder="weight in pounds"
              required
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
          </div>

          <div className="form-input-box">
            <select
              name="signupGoal"
              value={fitnessGoal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="Lose Weight">Lose Weight</option>
              <option value="Build Muscle">Build Muscle</option>
            </select>
          </div>

          <button disabled={isLoading}>Sign up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
