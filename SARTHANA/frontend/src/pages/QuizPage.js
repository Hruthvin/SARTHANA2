import React, { useState } from 'react';

const QuizPage = () => {
  const questions = [
    {
      question: "Who was the first President of India?",
      options: ["Dr. Rajendra Prasad", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
      answer: "Dr. Rajendra Prasad"
    },
    {
      question: "Which river is known as the 'Sorrow of Bengal'?",
      options: ["Ganga", "Damodar", "Brahmaputra", "Kaveri"],
      answer: "Damodar"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option === questions[currentQuestion].answer)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
