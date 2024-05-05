import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [height, setHeight] = useState(user?.height || ""); // Use optional chaining to handle null user
  const [weight, setWeight] = useState(user?.weight || "");
  const [fitnessGoal, setGoal] = useState(user?.fitnessGoal || "");
  const [bmi, setbmi] = useState(user?.bmi || "");

  const { updateProfile, error, isLoading } = useUpdateProfile();

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log(user.email, height, weight, fitnessGoal, user.token);

    await updateProfile(user.email, height, weight, fitnessGoal, user.token);
  };

  const getBmiColor = () => {
    if (bmi < 18.5) {
      return "red"; // Choose your color for BMI less than 18.5
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "green"; // Choose your color for BMI between 18.5 and 24.9
    } else {
      return "red"; // Choose your color for BMI greater than 24.9
    }
  };

  return (
    <div className="profileBG">
      <div className="profile">
        <form
          className="profileForm"
          onSubmit={handleUpdate}
          name="updateProfileForm"
        >
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
              Your BMI: <span style={{ color: getBmiColor() }}> {bmi} </span>
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

          <button disabled={isLoading}>Update profile</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
