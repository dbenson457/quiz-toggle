import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './question.css';

// Define the Option interface
interface Option {
  left: string;
  middle?: string;
  right: string;
  correct: string;
}

// Define the QuestionProps interface
interface QuestionProps {
  title: string;
  options: Option[];
  selections: string[];
  locked: boolean;
  onSelectionChange: (selections: string[], locked: boolean) => void;
}

// Question component
const Question: React.FC<QuestionProps> = ({
  title,
  options,
  selections: initialSelections,
  locked: initialLocked,
  onSelectionChange,
}) => {
  // State hooks
  const [selections, setSelections] = useState<string[]>(initialSelections);
  const [correctCount, setCorrectCount] = useState(0);
  const [locked, setLocked] = useState(initialLocked);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Update state when props change
  useEffect(() => {
    setSelections(initialSelections);
    setLocked(initialLocked);
  }, [initialSelections, initialLocked]);

  // Calculate the number of correct selections
  useEffect(() => {
    const count = selections.filter(
      (sel, i) =>
        (sel === 'left'
          ? options[i].left
          : sel === 'middle'
          ? options[i].middle
          : options[i].right) === options[i].correct
    ).length;
    setCorrectCount(count);
    if (count === options.length) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [selections, options]);

  // Notify parent component of selection changes
  useEffect(() => {
    onSelectionChange(selections, locked);
  }, [selections, locked]);

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine background color based on correct count
  const getBackgroundColor = () => {
    if (locked) {
      return 'linear-gradient(to bottom, #76E0C2, #59CADA)';
    }
    switch (correctCount) {
      case 0:
        return 'linear-gradient(to bottom, #F1B496, #EA806A)';
      case 1:
        return 'linear-gradient(to bottom, #F6B868, #EE6B2D)';
      case 2:
        return 'linear-gradient(to bottom, #FFD700, #FFA500)';
      case 3:
        return 'linear-gradient(to bottom, #FFFF00, #FFD700)';
      default:
        return 'linear-gradient(to bottom, #F6B868, #EE6B2D)';
    }
  };

  return (
    <div className="question-toggle-container" style={{ background: getBackgroundColor() }}>
      {/* Display the question title */}
      <h1 className="question-title">{title}</h1>
      <div className="options-container">
        {options.map((option, index) => (
          <div className={`option-row ${option.middle ? "three-options" : ""}`} key={index}>
            {/* Highlight circle to indicate selection */}
            <motion.div
              className={`highlight-circle ${locked ? "locked" : ""}`}
              animate={
                option.middle
                  ? isMobile
                    ? { y: selections[index] === "left" ? 0 : selections[index] === "middle" ? "100%" : "200%" }
                    : { x: selections[index] === "left" ? 0 : selections[index] === "middle" ? "100%" : "200%" }
                  : isMobile
                  ? { y: selections[index] === "left" ? 0 : "100%" }
                  : { x: selections[index] === "left" ? 0 : "100%" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {/* Left option button */}
            <motion.button
              className={`toggle-button ${selections[index] === "left" ? "selected" : ""} ${locked && selections[index] === "left" ? "locked" : ""}`}
              onClick={() =>
                !locked &&
                setSelections((prev) => prev.map((sel, i) => (i === index ? "left" : sel)))
              }
            >
              {option.left}
            </motion.button>
            {/* Middle option button, if present */}
            {option.middle && (
              <motion.button
                className={`toggle-button ${selections[index] === "middle" ? "selected" : ""} ${locked && selections[index] === "middle" ? "locked" : ""}`}
                onClick={() =>
                  !locked &&
                  setSelections((prev) => prev.map((sel, i) => (i === index ? "middle" : sel)))
                }
              >
                {option.middle}
              </motion.button>
            )}
            {/* Right option button */}
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
      {/* Display result message */}
      <p className="result-message">{locked ? "The answer is correct!" : "The answer is incorrect"}</p>
    </div>
  );
};

export default Question;