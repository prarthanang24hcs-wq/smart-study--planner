import { useEffect, useState } from "react";

function StudySessionsPage({ subjects }) {
  const defaultSessions = [
    {
      id: 1,
      subject: "Data Structures",
      topic: "Binary Trees",
      duration: "60 minutes",
      date: "Today",
      completed: false,
    },
    {
      id: 2,
      subject: "Operating Systems",
      topic: "Process Scheduling",
      duration: "45 minutes",
      date: "Today",
      completed: true,
    },
    {
      id: 3,
      subject: "Database Management",
      topic: "SQL Practice",
      duration: "90 minutes",
      date: "Tomorrow",
      completed: false,
    },
  ];

  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("smartStudySessions");

    return savedSessions
      ? JSON.parse(savedSessions)
      : defaultSessions;
  });

  const [showForm, setShowForm] = useState(false);

  const [newSession, setNewSession] = useState({
    subject: "",
    topic: "",
    duration: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "smartStudySessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  const addSession = () => {
    if (
      !newSession.subject ||
      !newSession.topic ||
      !newSession.duration ||
      !newSession.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const session = {
      ...newSession,
      id: Date.now(),
      completed: false,
    };

    setSessions((prevSessions) => [
      ...prevSessions,
      session,
    ]);

    setNewSession({
      subject: "",
      topic: "",
      duration: "",
      date: "",
    });

    setShowForm(false);
  };

  const toggleComplete = (id) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id
          ? {
              ...session,
              completed: !session.completed,
            }
          : session
      )
    );
  };

  const deleteSession = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this study session?"
    );

    if (!confirmed) {
      return;
    }

    setSessions((prevSessions) =>
      prevSessions.filter(
        (session) => session.id !== id
      )
    );
  };

  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.completed
  ).length;

  const pendingSessions =
    totalSessions - completedSessions;

  return (
    <div className="study-sessions-page">

      {/* Header */}
      <div className="study-sessions-header">

        <div>
          <h1>Study Sessions ⏱️</h1>

          <p>
            Track your focused study time and build consistent
            study habits.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Session
        </button>

      </div>

      {/* Summary */}
      <div className="study-session-stats">

        <div className="study-session-stat-card">
          <span>📚</span>
          <div>
            <strong>{totalSessions}</strong>
            <p>Total Sessions</p>
          </div>
        </div>

        <div className="study-session-stat-card">
          <span>⏳</span>
          <div>
            <strong>{pendingSessions}</strong>
            <p>Pending</p>
          </div>
        </div>

        <div className="study-session-stat-card">
          <span>✅</span>
          <div>
            <strong>{completedSessions}</strong>
            <p>Completed</p>
          </div>
        </div>

      </div>

      {/* Add Form */}
      {showForm && (
        <div className="study-session-form">

          <h2>Add Study Session</h2>

          <div className="study-session-form-grid">

            <select
              value={newSession.subject}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  subject: e.target.value,
                })
              }
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.name}
                >
                  {subject.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Study Topic"
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  topic: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Duration e.g. 60 minutes"
              value={newSession.duration}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  duration: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={newSession.date}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  date: e.target.value,
                })
              }
            />

          </div>

          <div className="form-buttons">

            <button
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              onClick={addSession}
            >
              Add Session
            </button>

          </div>

        </div>
      )}

      {/* Session List */}
      <div className="study-session-list">

        {sessions.length === 0 ? (
          <div className="empty-study-sessions">
            <h2>No study sessions yet 📚</h2>
            <p>
              Add your first study session to start
              tracking your study time.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              + Add Session
            </button>
          </div>
        ) : (
          sessions.map((session) => (

            <div
              className={`study-session-card ${
                session.completed ? "completed" : ""
              }`}
              key={session.id}
            >

              <div className="study-session-icon">
                ⏱️
              </div>

              <div className="study-session-info">

                <h2>{session.topic}</h2>

                <p>
                  📚 {session.subject}
                </p>

                <div className="study-session-details">
                  <span>
                    ⏰ {session.duration}
                  </span>

                  <span>
                    📅 {session.date}
                  </span>
                </div>

              </div>

              <div className="study-session-actions">

                <button
                  className="complete-button"
                  onClick={() =>
                    toggleComplete(session.id)
                  }
                >
                  {session.completed
                    ? "✓ Completed"
                    : "Mark Complete"}
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteSession(session.id)
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default StudySessionsPage;