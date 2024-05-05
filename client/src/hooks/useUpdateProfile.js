import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const updateProfile = async (email, height, weight, fitnessGoal, token) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, height, weight, fitnessGoal, token }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // remove user from storage
      localStorage.removeItem("user");
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { updateProfile, isLoading, error };
};
