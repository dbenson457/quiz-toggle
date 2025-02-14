import React, { useState, useEffect } from 'react';
import Question from '../question/Question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './quiz.css';
import { shuffleArray } from '../../utils/shuffle';

// Quiz component
const Quiz: React.FC = () => {
  // Define the questions
  const initialQuestions = [
    {
      title: 'An animal cell contains:',
      options: [
        {
          left: 'Cell wall',
          middle: 'Nucleus',
          right: 'Ribosomes',
          correct: 'Ribosomes',
        },
        { left: 'Cytoplasm', right: 'Chloroplast', correct: 'Cytoplasm' },
        {
          left: 'Partially permeable membrane',
          right: 'Impermeable membrane',
          correct: 'Partially permeable membrane',
        },
        { left: 'Cellulose', right: 'Mitochondria', correct: 'Mitochondria' },
      ],
    },
    {
      title: 'Which planets are in our Solar System?',
      options: [
        { left: 'Mars', middle: 'Milky Way', right: 'Galaxy', correct: 'Mars' },
        { left: 'Jupiter', right: 'Uranose', correct: 'Jupiter' },
        {
          left: 'Rocky',
          middle: 'Mercury',
          right: 'Freddie',
          correct: 'Mercury',
        },
        {
          left: 'Venus',
          middle: 'Williams',
          right: 'Tennis',
          correct: 'Venus',
        },
      ],
    },
    {
      title: 'What are the ideal conditions inside an office?',
      options: [
        {
          left: 'Good pay',
          middle: 'Decent Pay',
          right: 'Bad pay',
          correct: 'Good pay',
        },
        {
          left: 'Lots of meetings',
          right: 'Less meetings',
          correct: 'Less meetings',
        },
        {
          left: 'Free coffee',
          middle: 'No coffee',
          right: 'Expensive coffee',
          correct: 'Free coffee',
        },
        {
          left: 'Bear in office',
          right: 'Dog in office',
          correct: 'Dog in office',
        },
      ],
    },
  ];

  // State hooks
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState(
    initialQuestions.map((question) => ({
      selections: question.options.map(() => 'left'),
      locked: false,
    }))
  );
  const [allCorrect, setAllCorrect] = useState(false);

  // Shuffle questions and options on mount
  useEffect(() => {
    const shuffledQuestions = shuffleArray(initialQuestions).map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
    setQuestions(shuffledQuestions);
  }, []);

  // Show a toast message when all questions are correct
  useEffect(() => {
    if (allCorrect) {
      toast.success('All questions are correct!', {
        className: 'toast-success',
      });
    }
  }, [allCorrect]);

  // Handle selection changes
  const handleSelectionChange = (
    index: number,
    selections: string[],
    locked: boolean
  ) => {
    const newQuestionStates = [...questionStates];
    newQuestionStates[index] = { selections, locked };
    setQuestionStates(newQuestionStates);

    // Check if all questions are correct
    const allQuestionsCorrect = newQuestionStates.every((state, i) =>
      state.selections.every(
        (sel, j) =>
          (sel === 'left'
            ? questions[i].options[j].left
            : sel === 'middle'
            ? questions[i].options[j].middle
            : questions[i].options[j].right) ===
          questions[i].options[j].correct
      )
    );
    setAllCorrect(allQuestionsCorrect);
  };

  return (
    <div className='quiz-container'>
      {/* Toast notifications container */}
      <ToastContainer />
      {/* Render the current question */}
      <Question
        title={questions[currentQuestionIndex].title}
        options={questions[currentQuestionIndex].options}
        selections={questionStates[currentQuestionIndex].selections}
        locked={questionStates[currentQuestionIndex].locked}
        onSelectionChange={(selections, locked) =>
          handleSelectionChange(currentQuestionIndex, selections, locked)
        }
      />
      {/* Navigation buttons to switch between questions */}
      <div className='navigation-buttons'>
        {questions.map((_, index) => (
          <button
            key={index}
            className={`nav-button ${currentQuestionIndex === index ? 'active' : ''}`}
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
