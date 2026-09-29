import { useEffect, useState } from "react";

const defaultSessions = [
  {
    id: 1,
    subject: "Data Structures",
    topic: "Binary Trees",
    date: "Today",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    subject: "Operating Systems",
    topic: "Process Scheduling",
    date: "Today",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    subject: "Database Management",
    topic: "SQL Queries",
    date: "Tomorrow",
    startTime: "7:00 PM",
    endTime: "8:00 PM",
    priority: "Low",
    completed: false,
  },
];

function StudyPlannerPage({ subjects = [] }) {
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("smartStudySessions");

    if (savedSessions) {
      return JSON.parse(savedSessions);
    }

    return defaultSessions;
  });

  const [showForm, setShowForm] = useState(false);

  const [newSession, setNewSession] = useState({
    subject: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    priority: "Medium",
  });

  // Save sessions whenever they change
  useEffect(() => {
    localStorage.setItem(
      "smartStudySessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  const formatDate = (date) => {
    if (!date) return "";

    const selectedDate = new Date(date + "T00:00:00");

    return selectedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${period}`;
  };

  const addSession = () => {
    if (
      !newSession.subject ||
      !newSession.topic.trim() ||
      !newSession.date ||
      !newSession.startTime ||
      !newSession.endTime
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (newSession.endTime <= newSession.startTime) {
      alert("End time must be after start time.");
      return;
    }

    const session = {
      ...newSession,
      id: Date.now(),
      date: formatDate(newSession.date),
      startTime: formatTime(newSession.startTime),
      endTime: formatTime(newSession.endTime),
      completed: false,
    };

    setSessions((previousSessions) => [
      ...previousSessions,
      session,
    ]);

    setNewSession({
      subject: "",
      topic: "",
      date: "",
      startTime: "",
      endTime: "",
      priority: "Medium",
    });

    setShowForm(false);
  };

  const deleteSession = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study session?"
    );

    if (!confirmDelete) return;

    setSessions((previousSessions) =>
      previousSessions.filter((session) => session.id !== id)
    );
  };

  const toggleCompleted = (id) => {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === id
          ? {
              ...session,
              completed: !session.completed,
            }
          : session
      )
    );
  };

  return (
    <div className="planner-page">

      {/* PAGE HEADER */}

      <div className="planner-header">

        <div>
          <h1>Study Planner 📅</h1>

          <p>
            Organize your study sessions and stay on track.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Study Session
        </button>

      </div>


      {/* SUMMARY */}

      <div className="planner-summary">

        <div className="planner-summary-card">
          <span>📚</span>
          <div>
            <strong>{sessions.length}</strong>
            <p>Total Sessions</p>
          </div>
        </div>

        <div className="planner-summary-card">
          <span>⏳</span>
          <div>
            <strong>
              {sessions.filter(
                (session) => !session.completed
              ).length}
            </strong>
            <p>Pending</p>
          </div>
        </div>

        <div className="planner-summary-card">
          <span>✅</span>
          <div>
            <strong>
              {sessions.filter(
                (session) => session.completed
              ).length}
            </strong>
            <p>Completed</p>
          </div>
        </div>

      </div>


      {/* ADD SESSION FORM */}

      {showForm && (
        <div className="planner-form">

          <h2>Add Study Session</h2>

          <div className="planner-form-grid">

            <select
              value={newSession.subject}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  subject: e.target.value,
                })
              }
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.name}
                >
                  {subject.name}
                </option>
              ))}

              {/* Fallback if no subjects have been added */}
              {subjects.length === 0 && (
                <>
                  <option value="Data Structures">
                    Data Structures
                  </option>

                  <option value="Operating Systems">
                    Operating Systems
                  </option>

                  <option value="Database Management">
                    Database Management
                  </option>
                </>
              )}
            </select>


            <input
              type="text"
              placeholder="Topic"
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  topic: e.target.value,
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


            <input
              type="time"
              value={newSession.startTime}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  startTime: e.target.value,
                })
              }
            />


            <input
              type="time"
              value={newSession.endTime}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  endTime: e.target.value,
                })
              }
            />


            <select
              value={newSession.priority}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  priority: e.target.value,
                })
              }
            >
              <option value="High">
                High Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="Low">
                Low Priority
              </option>
            </select>

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


      {/* STUDY SESSIONS */}

      <div className="planner-list">

        {sessions.length === 0 ? (
          <div className="planner-empty">
            <div>📚</div>
            <h2>No study sessions yet</h2>
            <p>
              Click "+ Add Study Session" to create your first
              study session.
            </p>
          </div>
        ) : (
          sessions.map((session) => (

            <div
              className={`planner-card ${
                session.completed ? "completed" : ""
              }`}
              key={session.id}
            >

              <div className="planner-card-left">

                <div className="planner-icon">
                  📚
                </div>

                <div>

                  <div className="planner-title-row">

                    <h2>
                      {session.subject}
                    </h2>

                    <span
                      className={`priority ${session.priority.toLowerCase()}`}
                    >
                      {session.priority}
                    </span>

                  </div>

                  <p className="planner-topic">
                    {session.topic}
                  </p>

                  <p className="planner-time">
                    📅 {session.date}
                    &nbsp; • &nbsp;
                    🕐 {session.startTime} -{" "}
                    {session.endTime}
                  </p>

                </div>

              </div>


              <div className="planner-actions">

                <button
                  className="complete-button"
                  onClick={() =>
                    toggleCompleted(session.id)
                  }
                >
                  {session.completed
                    ? "↩ Mark Pending"
                    : "✓ Complete"}
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

export default StudyPlannerPage;