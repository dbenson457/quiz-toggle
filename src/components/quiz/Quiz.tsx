import React, { useState, useEffect } from "react";
import Question from "../question/Question";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./quiz.css";

const Quiz: React.FC = () => {
  const questions = [
    {
      title: "An animal cell contains:",
      options: [
        { left: "Cell wall", right: "Ribosomes", correct: "Ribosomes" },
        { left: "Cytoplasm", right: "Chloroplast", correct: "Cytoplasm" },
        { left: "Partially permeable membrane", right: "Impermeable membrane", correct: "Partially permeable membrane" },
        { left: "Cellulose", right: "Mitochondria", correct: "Mitochondria" },
      ],
    },
    {
      title: "Which planets are in our Solar System?",
      options: [
        { left: "Mars", right: "Galaxy", correct: "Mars" },
        { left: "Serena", right: "Venus", correct: "Venus" },
        { left: "Mercury", right: "Freddie", correct: "Mercury" },
        { left: "Jupiter", right: "Saturn", correct: "Jupiter" },
      ],
    },
    {
      title: "What are the ideal conditions inside an office?",
      options: [
        { left: "good pay", right: "bad pay", correct: "good pay" },
        { left: "lot of meetings", right: "less meetings", correct: "less meetings" },
        { left: "free coffee", right: "expensive coffee", correct: "free coffee" },
        { left: "bear in office", right: "dog in office", correct: "dog in office" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState(
    questions.map((question) => ({
      selections: question.options.map(() => "left"),
      locked: false,
    }))
  );
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    if (allCorrect) {
      toast.success("All questions are correct!");
    }
  }, [allCorrect]);

  const handleSelectionChange = (index: number, selections: string[], locked: boolean) => {
    const newQuestionStates = [...questionStates];
    newQuestionStates[index] = { selections, locked };
    setQuestionStates(newQuestionStates);

    const allQuestionsCorrect = newQuestionStates.every((state, i) =>
      state.selections.every((sel, j) =>
        (sel === "left" ? questions[i].options[j].left : questions[i].options[j].right) === questions[i].options[j].correct
      )
    );
    setAllCorrect(allQuestionsCorrect);
  };

  return (
    <div className="quiz-container">
      <ToastContainer />
      <Question
        title={questions[currentQuestionIndex].title}
        options={questions[currentQuestionIndex].options}
        selections={questionStates[currentQuestionIndex].selections}
        locked={questionStates[currentQuestionIndex].locked}
        onSelectionChange={(selections, locked) => handleSelectionChange(currentQuestionIndex, selections, locked)}
      />
      <div className="navigation-buttons">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`nav-button ${currentQuestionIndex === index ? "active" : ""}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            Question {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;