import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import QuizDisplay from "../components/QuizDisplay";

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await apiService.getQuizHistory();
      setHistory(data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to load quiz history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuiz = async (quizId) => {
    try {
      const quizData = await apiService.getQuizById(quizId);
      setSelectedQuiz(quizData);
      setShowModal(true);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to load quiz details");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz History</h1>
        <p className="text-gray-600">View all previously generated quizzes</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No quizzes generated yet</p>
          <p className="text-gray-400 mt-2">
            Generate your first quiz to see it here!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quiz.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quiz.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <a
                      href={quiz.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 truncate block max-w-xs"
                    >
                      {quiz.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(quiz.date_generated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewQuiz(quiz.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Quiz
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing quiz */}
      {showModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quiz Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <QuizDisplay quizData={selectedQuiz} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
