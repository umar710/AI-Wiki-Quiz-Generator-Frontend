import React, { useState } from "react";

const QuizDisplay = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!quizData) {
    return (
      <div className="text-center text-gray-500">No quiz data available</div>
    );
  }

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const calculateScore = () => {
    return quizData.questions.reduce((score, question, index) => {
      return (
        score + (selectedAnswers[index] === question.correct_answer ? 1 : 0)
      );
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {quizData.title}
        </h1>
        <p className="text-gray-600">
          Test your knowledge with this AI-generated quiz
        </p>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{quizData.summary}</p>
      </div>

      {/* Key Entities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Key Entities
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quizData.key_entities.map((entity, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">{entity.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{entity.description}</p>
              <p className="text-blue-600 text-xs mt-2">{entity.relevance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Topics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {quizData.related_topics.map((topic, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Quiz Questions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Quiz Questions
          </h2>
          {!showResults && (
            <button
              onClick={() => setShowResults(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Submit Answers
            </button>
          )}
        </div>

        <div className="space-y-6">
          {quizData.questions.map((question, qIndex) => (
            <div key={qIndex} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {qIndex + 1}. {question.question}
              </h3>

              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === option;
                  const isCorrect = option === question.correct_answer;
                  const showCorrect = showResults && isCorrect;
                  const showIncorrect = showResults && isSelected && !isCorrect;

                  return (
                    <label
                      key={oIndex}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        showCorrect
                          ? "bg-green-100 border-green-500"
                          : showIncorrect
                          ? "bg-red-100 border-red-500"
                          : isSelected
                          ? "bg-blue-100 border-blue-500"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(qIndex, option)}
                        className="mr-3"
                        disabled={showResults}
                      />
                      <span className="flex-1">{option}</span>
                      {showCorrect && (
                        <span className="text-green-600 font-semibold ml-2">
                          ✓ Correct
                        </span>
                      )}
                      {showIncorrect && (
                        <span className="text-red-600 font-semibold ml-2">
                          ✗ Incorrect
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {showResults && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800">
              Your Score: {calculateScore()} out of {quizData.questions.length}
            </h3>
            <p className="text-blue-600 mt-2">
              {calculateScore() === quizData.questions.length
                ? "Perfect! You're an expert!"
                : "Great effort! Keep learning!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDisplay;
