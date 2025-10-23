import React, { useState } from "react";
import { apiService } from "../services/api";
import QuizDisplay from "../components/QuizDisplay";

const GenerateQuizTab = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quizData, setQuizData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuizData(null);

    try {
      const data = await apiService.generateQuiz(url);
      setQuizData(data);
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          AI Wikipedia Quiz Generator
        </h1>
        <p className="text-gray-600">
          Transform any Wikipedia article into an engaging educational quiz
        </p>
      </div>

      {/* URL Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wikipedia URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/Your_Topic"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Generating Quiz..." : "Generate Quiz"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">
            Scraping Wikipedia and generating quiz with AI...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This may take 10-30 seconds
          </p>
        </div>
      )}

      {/* Quiz Results */}
      {quizData && (
        <div className="mt-8">
          <QuizDisplay quizData={quizData} />
        </div>
      )}
    </div>
  );
};

export default GenerateQuizTab;
