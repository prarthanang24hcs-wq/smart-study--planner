import { useState } from "react";

function HelpPage() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How do I add a subject?",
      answer:
        "Open My Subjects from the sidebar and use the Add Subject option. Enter the subject details and save it.",
    },
    {
      question: "How do I create a study goal?",
      answer:
        "Open Goals from the sidebar. Enter your goal title, subject, deadline and progress, then click Add Goal.",
    },
    {
      question: "Are my goals saved after refreshing the page?",
      answer:
        "Yes. Goals are stored in your browser using localStorage, so they remain available after refreshing the website.",
    },
    {
      question: "How does the Notes feature work?",
      answer:
        "You can write notes directly or upload an image of handwritten or printed notes. The OCR feature extracts readable text from the uploaded image.",
    },
    {
      question: "What can I do with the AI Study Assistant?",
      answer:
        "The AI Study Assistant is designed to simplify study material, create shorter answers, key points, keywords, 5-mark answers and flashcards.",
    },
    {
      question: "How do I change my study preferences?",
      answer:
        "Open Settings from the sidebar. You can update your name, email, daily study goal and notification preferences.",
    },
    {
      question: "What happens if I delete a goal?",
      answer:
        "The selected goal is removed from your Goals list and from the saved goals in your browser.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(
      openQuestion === index ? null : index
    );
  };

  return (
    <div className="help-page">

      <div className="help-header">
        <div>
          <h1>Help & Support ❓</h1>

          <p>
            Find answers and learn how to use Smart Study Planner.
          </p>
        </div>
      </div>

      <div className="help-welcome-card">
        <div className="help-welcome-icon">
          🎓
        </div>

        <div>
          <h2>Welcome to Smart Study Planner!</h2>

          <p>
            Use this platform to organize your subjects,
            notes, study goals, tasks and exam preparation
            in one place.
          </p>
        </div>
      </div>

      <div className="help-section">

        <h2>🚀 Quick Guide</h2>

        <div className="help-guide-grid">

          <div className="help-guide-card">
            <div className="help-guide-icon">📚</div>
            <h3>Manage Subjects</h3>
            <p>
              Add your subjects, teachers, codes,
              progress and priorities.
            </p>
          </div>

          <div className="help-guide-card">
            <div className="help-guide-icon">📝</div>
            <h3>Manage Notes</h3>
            <p>
              Write notes or upload note images
              and extract text using OCR.
            </p>
          </div>

          <div className="help-guide-card">
            <div className="help-guide-icon">🎯</div>
            <h3>Set Goals</h3>
            <p>
              Create study goals, set deadlines
              and track your progress.
            </p>
          </div>

          <div className="help-guide-card">
            <div className="help-guide-icon">⚙️</div>
            <h3>Customize Settings</h3>
            <p>
              Manage your profile and study
              preferences.
            </p>
          </div>

        </div>

      </div>

      <div className="help-section">

        <h2>❓ Frequently Asked Questions</h2>

        <div className="faq-list">

          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${
                openQuestion === index
                  ? "faq-open"
                  : ""
              }`}
              key={index}
            >

              <button
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>

                <span className="faq-arrow">
                  {openQuestion === index
                    ? "−"
                    : "+"}
                </span>
              </button>

              {openQuestion === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}

            </div>
          ))}

        </div>

      </div>

      <div className="help-contact-card">

        <div className="help-contact-icon">
          💬
        </div>

        <div>
          <h2>Need More Help?</h2>

          <p>
            If you have a problem while using the
            application, check the FAQ section first.
          </p>
        </div>

      </div>

    </div>
  );
}

export default HelpPage;