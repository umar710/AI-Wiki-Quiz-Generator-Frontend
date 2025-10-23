import React, { useState } from "react";
import GenerateQuizTab from "./tabs/GenerateQuizTab";
import HistoryTab from "./tabs/HistoryTab";

function App() {
  const [activeTab, setActiveTab] = useState("generate");

  const tabs = [
    { id: "generate", name: "Generate Quiz" },
    { id: "history", name: "History" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                AI Wiki Quiz Generator
              </h1>
            </div>
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === "generate" && <GenerateQuizTab />}
        {activeTab === "history" && <HistoryTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              AI Wiki Quiz Generator - Transform Wikipedia articles into
              educational quizzes
            </p>
            <p className="mt-2">
              Powered by FastAPI, React, and Google Gemini AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
