import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

/*export const useAuthContext = () => {
  return {
    user: {
      email: "demo@example.com",
      name: "Carlos",
      height: 68,  // Example height in inches
      weight: 150, // Example weight in pounds
      fitnessGoal: "Lose Weight",
      bmi: 22.3,
      token: "mock-token"
    }
  };
};*/

