//import ExerciseSearch from "../components/ExerciseSearch";

const Exercise = () => {
  // Data structure for exercises
  const exercisesData = [

    {
      muscleGroup: "Legs",
      exercises: [
        { name: "Squats", videoLink: "https://www.youtube.com/watch?v=4KmY44Xsg2w" },
        { name: "Leg Press", videoLink: "https://www.youtube.com/watch?v=8EMbB0tCn7Q" },
        { name: "Lunges", videoLink: "https://www.youtube.com/watch?v=wrwwXE_x-pQ" }
      ]
    },

    {
      muscleGroup: "Chest",
      exercises: [
        { name: "Bench Press", videoLink: "https://www.youtube.com/watch?v=4Y2ZdHCOXok" },
        { name: "Push Up", videoLink: "https://www.youtube.com/watch?v=JyCG_5l3XLk" },
        { name: "Chest Fly", videoLink: "https://www.youtube.com/watch?v=eGjt4lk6g34" }
      ]
    }, 
  
    {
      muscleGroup: "Back",
      exercises: [
        { name: "Pull-Ups", videoLink: "https://www.youtube.com/watch?v=fO3dKSQayfg" },
        { name: "Deadlifts", videoLink: "https://www.youtube.com/watch?v=XxWcirHIwVo" },
        { name: "Bent Over Rows", videoLink: "https://www.youtube.com/watch?v=qXrTDQG1oUQ" }
      ]
    },

    {
      muscleGroup: "Biceps",
      exercises: [
        { name: "Bicep Curls", videoLink: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
        { name: "Hammer Curls", videoLink: "https://www.youtube.com/watch?v=TwD-YGVP4Bk" },
        { name: "Concentration Curls", videoLink: "https://www.youtube.com/watch?v=0AUGkch3tzc" }
      ]
    },

    {
      muscleGroup: "Triceps",
      exercises: [
        { name: "Tricep Dips", videoLink: "https://www.youtube.com/watch?v=6kALZikXxLc" },
        { name: "Skull Crushers", videoLink: "https://www.youtube.com/watch?v=d_KZxkY_0cM" },
        { name: "Tricep Kickbacks", videoLink: "https://www.youtube.com/watch?v=6SS6K3lAwZ8" }
      ]
    }
    
    // Add more muscle groups and exercises as needed
  ];

  return (
    <div className="exerciseBG">
      <div className="exercise">
        <div className="summary">
          <h1 className="header">Exercise</h1>
          <p>
            Welcome to the Exercise Page!
            <br />
            Here you can find the most popular exercises along with a
            description and YouTube video to help you get started on your
            fitness journey.
            <br />
            Remember, be consistent, strong, and mostly importantly have fun on
            this wonderful journey to improving your health!
          </p>
        </div>
        <div>
          {exercisesData.map(group => (
            <div key={group.muscleGroup}>
             <h2 style={{ 
    fontSize: '40px', 
    color: 'rgb(30, 144, 255)' // Uniform color for all muscle group headings
}}>
    {group.muscleGroup}
</h2>
            <ul>
              {group.exercises.map(exercise => (
                <li key={exercise.name} style={{ color: 'rgb(135, 206, 250)' }}>
                {exercise.name} - <a href={exercise.videoLink} target="_blank" rel="noopener noreferrer">Watch</a>
              </li>
              ))}
            </ul>
          </div>
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercise;