import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data.js";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [isQuizOver, setIsQuizOver] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.answer === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.answer - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    resetStyles();
    setLock(false);
    let newIndex = index + 1;
    if (newIndex < data.length) {
      setIndex(newIndex);
      setQuestion(data[newIndex]);
    } else {
      setIsQuizOver(true);
    }
  };

  const prevQuestion = () => {
    resetStyles();
    setLock(false);
    let newIndex = index - 1;
    if (newIndex >= 0) {
      setIndex(newIndex);
      setQuestion(data[newIndex]);
    }
  };

  const resetStyles = () => {
    let listItems = document.querySelectorAll("li");
    listItems.forEach((li) => {
      li.classList.remove("correct", "wrong");
    });
  };

  const handleStartAgain = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setIsQuizOver(false);
    resetStyles();
  };

  return (
    <div className="container">
      <h1>Quiz Application</h1>
      <hr />

      {isQuizOver ? (
        <>
          <h2>Quiz Completed!</h2>
          <p>
            Your score is: {score} out of {data.length}
          </p>
          <button onClick={handleStartAgain} className="startAgain">
            Start Again
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <div className="buttons">
            <button onClick={prevQuestion} disabled={index === 0}>
              Previous
            </button>
            <button onClick={nextQuestion} disabled={isQuizOver}>
              Next
            </button>
          </div>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
