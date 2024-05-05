import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];

const size = {
  width: 400,
  height: 200,
};

const Home = () => {
  const { user } = useAuthContext();

  // Workout and Nutrition variables
  const [workoutResponse, setWorkoutResponse] = useState("");
  const [nutritionResponse, setNutritionResponse] = useState("");
  const [currentWorkout, setCurrentWorkout] = useState("");
  const [currentNutrition, setCurrentNutrition] = useState("");

  // Calorie Tracker variables
  const [calories, setCalories] = useState(0);
  const [displayCalories, setDisplayCalories] = useState(0);

  // ChatGPT default prompts
  const exercisePrompt =
    "Without answering back just give me a workout plan in list format and only use up to 200 words. ";
  const nutritionPrompt =
    "Without answering back or telling me to talk to a professional, give me a nutrition plan and specify what food or meals to have and only use up to 200 words. ";

  useEffect(() => {
    const fetchCalorie = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/user/${user.email}/calorie`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDisplayCalories(data);
      } catch (error) {
        console.error("Error fetching calories:", error);
        // Optionally update the state to indicate an error
      }
    };

    const fetchWorkout = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/user/${user.email}/workout`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCurrentWorkout(data);
      } catch (error) {
        console.error("Error fetching workout:", error);
        // Optionally update the state to indicate an error
      }
    };

    const fetchNutrition = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/user/${user.email}/nutrition`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCurrentNutrition(data);
      } catch (error) {
        console.error("Error fetching workout:", error);
        // Optionally update the state to indicate an error
      }
    };

    fetchCalorie();
    fetchWorkout();
    fetchNutrition();
  }, [user]);

  // Update workout plan in the database
  const updateWorkout = (workoutData) => {
    fetch(`/api/user/${user.email}/workout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workout: workoutData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkoutResponse(data.workout);
      })
      .catch((err) => {
        console.error("Error updating workout in the database:", err);
      });
  };

  // Update nutrition plan in the database
  const updateNutrition = (nutritionData) => {
    fetch(`/api/user/${user.email}/nutrition`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nutrition: nutritionData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNutritionResponse(data.nutrition);
      })
      .catch((err) => {
        console.error("Error updating workout in database:", err);
      });
  };

  // Update calories in the database
  const updateCalorie = (newCal) => {
    let totalCal =
      newCal === 0 ? 0 : Number(displayCalories) + Number(calories);

    if (totalCal < 0) {
      totalCal = 0;
    }

    fetch(`/api/user/${user.email}/calorie`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calorie: totalCal }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDisplayCalories(data.calorie);
      })
      .catch((err) => {
        console.error("Error updating workout in the database:", err);
      });
  };

  // Reset calories to 0
  const deleteCalories = (e) => {
    e.preventDefault();
    setDisplayCalories(0);
    updateCalorie(0);
    setCalories(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let fullPrompt = exercisePrompt;

    if (user) {
      fullPrompt += `Personalize my workout plan based on the following. My BMI: ${user.bmi} and my fitness goal is ${user.fitnessGoal}.`;
    }
    console.log(fullPrompt);

    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    })
      .then((res) => {
        // Check if the content type is JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else if (
          contentType &&
          contentType.indexOf("application/json") !== -1
        ) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        setWorkoutResponse(data);
        updateWorkout(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    let fullPrompt = nutritionPrompt;

    if (user) {
      fullPrompt += `Personalize my nutrition plan and daily recommended calories based on the following. My BMI: ${user.bmi} and my fitness goal is ${user.fitnessGoal}.`;
    }
    console.log(fullPrompt);

    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    })
      .then((res) => {
        // Check if the content type is JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else if (
          contentType &&
          contentType.indexOf("application/json") !== -1
        ) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        setNutritionResponse(data);
        updateNutrition(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="homeBG">
      <div className="summary">
        <h1 className="header">Home</h1>
        <p>
          Welcome to the Home Page!
          <br />
          Here you can get your workout routine and nutrition plan from openAI
          and track your calories.
          <br />
          Remember, these are just recommendations from AI. Feel free to follow
          your own workout routines and nutrition plans if preferred.
        </p>
      </div>

      {user && (
        <>
          <div className="calorieTracker">
            <form className="calorieForm" name="calorieForm">
              <div className="calorieCounter">
                Daily Calories: <span>{displayCalories}</span>
              </div>

              <div className="controlInput">
                <input
                  type="number"
                  placeholder="Calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  min={0}
                />
                <div>
                  <button
                    className="calorieAddButton"
                    type="submit"
                    onClick={updateCalorie}
                  >
                    {" "}
                    Add Calories{" "}
                  </button>
                  <button
                    className="calorieResetButton"
                    type="submit"
                    onClick={deleteCalories}
                  >
                    {" "}
                    Reset Calories{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      <div className="chatSection">
        <div className="chat-wrapper">
          <div>
            <button className="chatButton" type="submit" onClick={handleSubmit}>
              Get new workout plan
            </button>
          </div>

          <div>
            {user && (
              <p className="currentWorkout">
                Workout Plan:
                <br />
                {currentWorkout}
              </p>
            )}
            <p className="chatRes">{workoutResponse}</p>
          </div>
        </div>

        <div className="chat-wrapper">
          <div>
            <button
              className="chatButton"
              type="submit"
              onClick={handleSubmit2}
            >
              Get new nutrition plan
            </button>
          </div>
          <div>
            {user && (
              <p className="currentNutrition">
                Nutrition Plan:
                <br />
                {currentNutrition}
              </p>
            )}
            <p className="chatRes">{nutritionResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
