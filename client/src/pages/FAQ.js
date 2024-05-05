import { useState } from "react";

const FAQ = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  const data = [
    {
      question: "How does this app work?",
      answer:
        "This app uses openAI chatGPT and your user info to help generate your personalized workout and nutrition plans.",
    },
    {
      question: "How do I use this app?",
      answer:
        "Make sure your user info is accurate and then hit the generate workout and nutrition plan buttons in Home page.",
    },
    {
      question: "What if I want more info on the exercises?",
      answer:
        "There is an Exercise Page where you can see names, descriptions, and videos of common exercises.",
    },
    {
      question: "What is some advice on achieving my fitness goal?",
      answer:
        "Be consistent, curious and have fun. Do not forget to drink lots of water! The more processed the food, the less healthy it is.",
    },
    {
      question: "What are things I should track?",
      answer:
        "Keep track of calories and protein, what you eat daily and how much exercise you do. Fitness is all input and output in the end.",
    },
  ];

  return (
    <div className="faqBG">
      <div className="summary">
        <h1 className="header">Frequently Asked Questions</h1>
        <p>
          Welcome to the FAQ Page!
          <br />
          Here you can find common questions that are related to the usage and
          details of our app.
          <br />
          Feel free to explore until your curiosity is met!
        </p>
      </div>

      <div className="faq">
        {data.map((item, i) => (
          <div className="faq-item" key={item.question}>
            <div className="faq-q" onClick={() => toggle(i)}>
              <h2> {item.question} </h2>
              <span> {selected === i ? "-" : "+"} </span>
            </div>
            <div className={selected === i ? "faq-a show" : "faq-a"}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
