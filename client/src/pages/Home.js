import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");
  const { user } = useAuthContext();
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const totalCalories = meals
  .map((meal)=> meal.calories)
  .reduce((acc,value)=>acc + +value, 0);

  const addMealsHandler = (e) => {
    e.preventDefault();
    if (calories <= 0 || mealName === "") {
      alert("Calories should not be negative or 0, and the meal name should not be empty");
      return;
    }
    const newMeal = {
      mealName,
      calories,
      id: Math.floor(Math.random() * 1000),
    };
    setMeals([...meals, newMeal]);
    setMealName("");
    setCalories(0);
  };
  
  const deleteMealHandler = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };
  

  const deleteAllMeals = (e) => {
    setMeals([])
  }


  const exercisePrompt = "Without answering back just give me an exercise plan in list in 50 words";
  const nutritionPrompt = "Without answering back just give me a nutrition plan specify what food in list in 50 words";

  const handleSubmit = (e) => {
    e.preventDefault();

    let fullPrompt = exercisePrompt;

    if (user) {
      fullPrompt += ` Height: ${user.height} Weight: ${user.weight} BMI: ${user.bmi}`;
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
        setResponse(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    let fullPrompt = nutritionPrompt;

    if (user) {
      fullPrompt += ` Height: ${user.height} Weight: ${user.weight} BMI: ${user.bmi}`;
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
        setResponse2(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="main">
      <div className="home">
        <div className="summary">
          <h1 className="header">Home</h1>
          <p>
            Welcome to the Home Page!
            <br />
            Here you can get your workout routine and nutrition plan from openAI
            and track your calories.
            <br />
            Remember, these are just recommendations from AI. Feel free to
            follow your own workout routines and nutrition plans if preferred.
          </p>
        </div>

        { openModal ?
        <div className = "modal">
          <h3> Calories must be greater than 0 and meal name cannot be empty</h3>
          <button className = "closeModal" onClick={setOpenModal(false)}> Close </button> 
        </div> : ""
        }

        <div className="calorieTracker">
          <form className="calorieForm" name="calorieForm">

            <div className="calorieCounter">
              Total Calories: <span>{totalCalories}</span>
            </div>

            <div className="controlInput">
              <input type="text"
                placeholder="Meal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
              <input type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                min={0}
              />
              <button className="addMealButton" onClick={addMealsHandler} > Add Meal </button>
              <button className="calorieResetButton" onClick={deleteAllMeals}> Reset Calorie </button>
            </div>
          </form>
        </div>

        <div className="mealContainer">
          <div className="mealsList" >
            {meals.map((meals, index) => (
              <div key={index} className="mealsListinner">
                <div >{`${meals.mealName} : ${meals.calories}`}</div>
                <div >
                  <button clasName="deleteMeal" 
                  onClick={deleteMealHandler(meals.id)}> 
                  Delete </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-wrapper">
          <form className="chat-form" onSubmit={handleSubmit} name="chatForm">
            <div className="">Generate exercise plan:</div>

            <div>
              <button className="" type="submit">
                Generate
              </button>
            </div>
          </form>

          <div className="">
            <p>{response}</p>
          </div>
        </div>
        <div className="chat-wrapper">
          <form className="chat-form" onSubmit={handleSubmit2} name="chatForm">
            <div className="">Generate nutrition plan:</div>

            <div>
              <button className="" type="submit">
                Generate
              </button>
            </div>
          </form>

          <div className="">
            <p>{response2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
