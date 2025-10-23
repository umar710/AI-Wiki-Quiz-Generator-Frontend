// Fix the API base URL - remove trailing slash
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://ai-wiki-quiz-generator-backend.onrender.com";

export const apiService = {
  async generateQuiz(url) {
    // Remove any double slashes by ensuring proper URL construction
    const apiUrl = `${API_BASE}/generate_quiz`.replace(/([^:]\/)\/+/g, "$1");

    console.log("Calling API:", apiUrl); // Debug log

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to generate quiz");
    }

    return response.json();
  },

  async getQuizHistory() {
    const apiUrl = `${API_BASE}/history`.replace(/([^:]\/)\/+/g, "$1");
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch quiz history");
    }
    return response.json();
  },

  async getQuizById(quizId) {
    const apiUrl = `${API_BASE}/quiz/${quizId}`.replace(/([^:]\/)\/+/g, "$1");
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch quiz");
    }
    return response.json();
  },
};
