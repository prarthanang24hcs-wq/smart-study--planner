import { useEffect, useState } from "react";

function AIStudyAssistantPage() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedText = localStorage.getItem("aiStudyText");

    if (savedText) {
      setAnswer(savedText);
      localStorage.removeItem("aiStudyText");
    }
  }, []);

  const simplifyAnswer = async (type) => {
    if (!answer.trim()) {
      alert("Please paste an answer first.");
      return;
    }

    setMode(type);
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:5000/api/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: answer,
          mode: type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch (error) {
      console.error("AI Error:", error);

      setResult(
        "❌ Could not connect to the AI server.\n\n" +
        "Make sure the backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-study-page">
      <div className="ai-study-header">
        <div>
          <h1>AI Study Assistant 🤖</h1>

          <p>
            Make your study material shorter, easier and exam-ready using AI.
          </p>
        </div>
      </div>

      <div className="ai-study-card">
        <h2>📄 Paste Your Answer</h2>

        <textarea
          placeholder="Paste your long answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="ai-actions">
          <button
            onClick={() => simplifyAnswer("Make the answer shorter")}
            disabled={loading}
          >
            ✂️ Make Shorter
          </button>

          <button
            onClick={() => simplifyAnswer("Explain the answer in simple language")}
            disabled={loading}
          >
            🧠 Make Easier
          </button>

          <button
            onClick={() => simplifyAnswer("Create a proper 5-mark exam answer")}
            disabled={loading}
          >
            📝 5-Mark Answer
          </button>

          <button
            onClick={() => simplifyAnswer("Give the important key points")}
            disabled={loading}
          >
            📌 Key Points
          </button>

          <button
            onClick={() => simplifyAnswer("Give the most important keywords")}
            disabled={loading}
          >
            🔑 Keywords
          </button>

          <button
            onClick={() => simplifyAnswer("Create useful question and answer flashcards")}
            disabled={loading}
          >
            🃏 Flashcards
          </button>
        </div>

        {loading && (
          <div className="ai-loading">
            🤖 AI is studying your answer...
          </div>
        )}
      </div>

      {result && (
        <div className="ai-result-card">
          <div className="ai-result-header">
            <h2>✨ Study Result</h2>
            <span>{mode}</span>
          </div>

          <div className="ai-result">
            {result.split("\n").map((line, index) => (
              <p key={index}>
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIStudyAssistantPage;