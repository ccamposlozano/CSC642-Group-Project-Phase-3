import { useState } from "react";


const Profile = () => {
  const [height, setHeight] = useState(""); // Use optional chaining to handle null user
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setGoal] = useState("");
  const [bmi, setBmi] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    // Calculate BMI
    if (height && weight) {
      const bmiValue = ((weight / (height * height)) * 703).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const getBmiColor = () => {
    if (bmi < 18.5) {
      return "red";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <div className="profileBG">
      <div className="profile">
        <form className="profileForm" onSubmit={handleUpdate} name="updateProfileForm">
          <h1>Update Profile</h1>

          <h3>Change Height in inches (in.)</h3>
          <div className="form-input-box">
            <input
              name="profileHeight"
              type="number"
              placeholder="height in inches"
              required
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </div>

          <h3>Change Weight in pounds (lbs.)</h3>
          <div className="form-input-box">
            <input
              name="profileWeight"
              type="number"
              placeholder="weight in pounds"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
          </div>

          <div className="profileBMI">
            <h3>
              Healthy Body Mass Index (BMI) is:
              <br />
              18.5 to 24.9
              <br />
              <br />
              Your BMI: <span style={{ color: getBmiColor() }}>{bmi}</span>
            </h3>
          </div>

          <div className="form-input-box">
            <select
              name="profileGoal"
              value={fitnessGoal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="Lose Weight">Lose Weight</option>
              <option value="Build Muscle">Build Muscle</option>
            </select>
          </div>

          <button>Update profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
