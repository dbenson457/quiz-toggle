# Question Toggle Quiz

## 📌 Project Overview

This project is a **React (TypeScript)** quiz application where users toggle between multiple options for each question. The background color dynamically updates based on the number of correct answers. Once all answers are correct, the question locks and once all questions are correct, the quiz displays a message.

##  Features Implemented

- **Dynamic Background Color:** Transitions from orange to blue as more correct answers are selected.
- **Toggle Button Interaction:** Users can select between multiple options per question.
- **Answer Locking Mechanism:** The question locks when all correct answers are chosen.
- **Component-Based Architecture:** Uses modular React components.
- **Scoped CSS Styling:** Each component has its own CSS file for maintainability.

## Project Structure (CSS & TypeScript Focused)

```
/quiz-toggle
  ├── src
  │   ├── components
  │   │   ├── question
  │   │   │   ├── Question.tsx        # Question component
  │   │   │   ├── Question.test.tsx   # Unit tests for Question component
  │   │   │   └── question.css        # Styles for Question component
  │   │   ├── quiz
  │   │   │   ├── Quiz.tsx            # Quiz container component
  │   │   │   └── quiz.css            # Styles for Quiz component
  │   ├── App.tsx                     # Root application component
  │   ├── App.css                     # Global styles
  │   ├── index.css                   # Additional global styles
  │   ├── main.tsx                     # Application entry point
  └── README.md
```

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dbenson457/quiz-toggle.git
   cd quiz-toggle
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Access the application:** Open your browser and navigate to `http://localhost:[address stated in terminal]/`.

## ⚙️ Technologies Used

- **React (TypeScript):** UI development framework.
- **CSS Modules:** Component-specific styling.

## Assumptions

- Each question has exactly **4 options**.
- Users can select only **one toggle per option**.
- The quiz contains a **fixed set of questions**.
- The background color changes **proportionally** based on correct answers.
- The quiz **locks** only when **all answers are correct**.

## Limitations

- **No Question Randomization:** Currently, the questions appear in a fixed order. Although an attempt was made to implement randomization of both the questions and their options, it is not fully functional. If you are interested in reviewing the attempt and possibly contributing to fixing the randomization functionality, please check out the `randomise-quiz` branch. This branch contains the code and logic used in the attempt to shuffle the questions and options.
- **Static Question Set:** Questions are hardcoded in the codebase.
- **No Backend Integration:** Data is managed on the client side.
- **Testing:** Unit test not configured correctly.

## Future Improvements

- Implement **question randomization**.
- Support **dynamic question loading** from an API.
- Enhance **accessibility features**.
- Implement **Jest testing** correctly.
