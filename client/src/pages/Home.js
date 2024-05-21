import { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);
  const totalCarbs = meals.reduce((acc, meal) => acc + meal.carbs, 0);
  const totalFats = meals.reduce((acc, meal) => acc + meal.fats, 0);

  const addMealsHandler = () => {
    const newMeal = {
      mealName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      id: Math.floor(Math.random() * 1000),
    };

    if (calories <= 0 || mealName === "") {
      alert("Calories must be greater than 0 and meal name cannot be empty");
      setOpenModal(true);
    } else {
      setMeals([...meals, newMeal]);
      setMealName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
    }
  };

  const deleteMealHandler = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const deleteAllMeals = () => {
    setMeals([]);
  };

  const data = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        label: 'Macros',
        data: [totalProtein, totalCarbs, totalFats],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const doughnutData = {
    labels: ['Remaining Calories', 'Consumed Calories'],
    datasets: [
      {
        data: [2000 - totalCalories, totalCalories],
        backgroundColor: ['#4BC0C0', '#FF9F40'],
        hoverBackgroundColor: ['#4BC0C0', '#FF9F40']
      }
    ]
  };

  const generatePlan = (type) => {
    alert(`Generate ${type} plan`);
  };

  return (
    <div className="main">
      <div className="home full-width">
        <div className="summary full-width">
          <h1 className="header">Home</h1>
          <p>
            Welcome to the Home Page!
            <br />
            Here you can get your workout routine and nutrition plan from openAI and track your calories.
            <br />
            Remember, these are just recommendations from AI. Feel free to follow your own workout routines and nutrition plans if preferred.
          </p>
        </div>

        {openModal && (
          <div className="modal">
            <h3>Calories must be greater than 0 and meal name cannot be empty</h3>
            <button className="closeModal" onClick={() => setOpenModal(false)}>Close</button>
          </div>
        )}

        <div className="calorieTracker full-width">
          <form className="calorieForm" name="calorieForm">
            <div className="calorieCounter">
              Total Calories: <span>{totalCalories}</span>
            </div>
            <div className="macroCounter">
              Protein: <span>{totalProtein}g</span> | Carbs: <span>{totalCarbs}g</span> | Fats: <span>{totalFats}g</span>
            </div>
            <div className="controlInput">
              <input
                type="text"
                placeholder="Meal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <input
                type="number"
                placeholder="Protein (g)"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
              <input
                type="number"
                placeholder="Carbs (g)"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
              <input
                type="number"
                placeholder="Fats (g)"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              />
              <button type="button" className="addMealButton" onClick={addMealsHandler}>Add Meal</button>
              <button type="button" className="calorieResetButton" onClick={deleteAllMeals}>Reset Calorie</button>
            </div>
          </form>
        </div>

        <div className="mealContainer full-width">
          <div className="mealsList">
            {meals.map((meal, index) => (
              <div key={index} className="mealsListinner">
                <div>{`${meal.mealName}: ${meal.calories} kcal | P: ${meal.protein}g | C: ${meal.carbs}g | F: ${meal.fats}g`}</div>
                <button type="button" className="deleteMeal" onClick={() => deleteMealHandler(meal.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>Macros Breakdown</h3>
          <Doughnut data={data} />
        </div>

        <div className="chart-container">
          <h3>Total Calories</h3>
          <div className="doughnut-container">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        <div className="generate-buttons">
          <button className="generate-button" onClick={() => generatePlan('nutrition')}>Generate Nutrition Plan</button>
          <button className="generate-button" onClick={() => generatePlan('workout')}>Generate Workout Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
