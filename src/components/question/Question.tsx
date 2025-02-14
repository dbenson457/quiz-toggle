import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./question.css";

interface Option {
  left: string;
  right: string;
  correct: string;
}

interface QuestionProps {
  title: string;
  options: Option[];
  selections: string[];
  locked: boolean;
  onSelectionChange: (selections: string[], locked: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ title, options, selections: initialSelections, locked: initialLocked, onSelectionChange }) => {
  const [selections, setSelections] = useState<string[]>(initialSelections);
  const [correctCount, setCorrectCount] = useState(0);
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
    setSelections(initialSelections);
    setLocked(initialLocked);
  }, [initialSelections, initialLocked]);

  useEffect(() => {
    const count = selections.filter((sel, i) =>
      (sel === "left" ? options[i].left : options[i].right) === options[i].correct
    ).length;
    setCorrectCount(count);
    if (count === options.length) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [selections, options]);

  useEffect(() => {
    onSelectionChange(selections, locked);
  }, [selections, locked]);

  const getBackgroundColor = () => {
    if (locked) {
      return "linear-gradient(to bottom, #76E0C2, #59CADA)";
    }
    switch (correctCount) {
      case 0:
        return "linear-gradient(to bottom, #F1B496, #EA806A)";
      case 1:
        return "linear-gradient(to bottom, #F6B868, #EE6B2D)";
      case 2:
        return "linear-gradient(to bottom, #FFD700, #FFA500)"; // Brighter orange/yellow
      case 3:
        return "linear-gradient(to bottom, #FFFF00, #FFD700)"; // Even brighter yellow
      default:
        return "linear-gradient(to bottom, #F6B868, #EE6B2D)";
    }
  };

  const isMobile = window.innerWidth <= 480;

  return (
    <div className="question-toggle-container" style={{ background: getBackgroundColor() }}>
      <h1 className="question-title">{title}</h1>
      <div className="options-container">
        {options.map((option, index) => (
          <div className="option-row" key={index}>
            <motion.div
              className={`highlight-circle ${locked ? "locked" : ""}`}
              animate={isMobile ? { y: selections[index] === "left" ? 0 : "100%" } : { x: selections[index] === "left" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.button
              className={`toggle-button ${selections[index] === "left" ? "selected" : ""} ${locked && selections[index] === "left" ? "locked" : ""}`}
              onClick={() =>
                !locked &&
                setSelections((prev) => prev.map((sel, i) => (i === index ? "left" : sel)))
              }
            >
              {option.left}
            </motion.button>
            <motion.button
              className={`toggle-button ${selections[index] === "right" ? "selected" : ""} ${locked && selections[index] === "right" ? "locked" : ""}`}
              onClick={() =>
                !locked &&
                setSelections((prev) => prev.map((sel, i) => (i === index ? "right" : sel)))
              }
            >
              {option.right}
            </motion.button>
          </div>
        ))}
      </div>
      <p className="result-message">{locked ? "The answer is correct" : "The answer is incorrect"}</p>
    </div>
  );
};

export default Question;

