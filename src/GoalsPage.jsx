import { useEffect, useState } from "react";

function GoalsPage() {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("smartStudyGoals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem("smartStudyGoals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!title.trim()) {
      alert("Please enter a goal.");
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General Study",
      deadline,
      progress: Number(progress),
      completed: Number(progress) === 100,
    };

    setGoals((currentGoals) => [newGoal, ...currentGoals]);

    setTitle("");
    setSubject("");
    setDeadline("");
    setProgress(0);
  };

  const deleteGoal = (id) => {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed,
              progress: !goal.completed ? 100 : 0,
            }
          : goal
      )
    );
  };

  const updateProgress = (id, value) => {
    const newProgress = Number(value);

    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: newProgress,
              completed: newProgress === 100,
            }
          : goal
      )
    );
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div>
          <h1>My Goals 🎯</h1>
          <p>
            Set study goals, track your progress and stay motivated.
          </p>
        </div>
      </div>

      <div className="goals-form-card">
        <h2>➕ Create a New Goal</h2>

        <div className="goals-form-grid">
          <input
            type="text"
            placeholder="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          >
            <option value="0">0% Complete</option>
            <option value="25">25% Complete</option>
            <option value="50">50% Complete</option>
            <option value="75">75% Complete</option>
            <option value="100">100% Complete</option>
          </select>
        </div>

        <button className="primary-button" onClick={addGoal}>
          🎯 Add Goal
        </button>
      </div>

      <div className="goals-summary">
        <div className="goal-stat-card">
          <span>🎯</span>
          <div>
            <strong>{goals.length}</strong>
            <p>Total Goals</p>
          </div>
        </div>

        <div className="goal-stat-card">
          <span>✅</span>
          <div>
            <strong>
              {goals.filter((goal) => goal.completed).length}
            </strong>
            <p>Completed</p>
          </div>
        </div>

        <div className="goal-stat-card">
          <span>⏳</span>
          <div>
            <strong>
              {goals.filter((goal) => !goal.completed).length}
            </strong>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      <div className="goals-list">
        {goals.length === 0 ? (
          <div className="empty-goals">
            <div className="empty-goals-icon">🎯</div>
            <h2>No Goals Yet</h2>
            <p>
              Create your first study goal and start tracking your progress.
            </p>
          </div>
        ) : (
          goals.map((goal) => (
            <div
              className={`goal-card ${
                goal.completed ? "goal-completed" : ""
              }`}
              key={goal.id}
            >
              <div className="goal-card-top">
                <div>
                  <h2>{goal.title}</h2>
                  <p>📚 {goal.subject}</p>
                </div>

                <button
                  className="goal-delete"
                  onClick={() => deleteGoal(goal.id)}
                  title="Delete goal"
                >
                  🗑️
                </button>
              </div>

              <div className="goal-details">
                <span>
                  📅{" "}
                  {goal.deadline
                    ? goal.deadline
                    : "No deadline set"}
                </span>

                <span>
                  {goal.completed
                    ? "✅ Completed"
                    : "⏳ In Progress"}
                </span>
              </div>

              <div className="goal-progress-section">
                <div className="goal-progress-header">
                  <strong>Progress</strong>
                  <span>{goal.progress}%</span>
                </div>

                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="goal-actions">
                <select
                  value={goal.progress}
                  onChange={(e) =>
                    updateProgress(goal.id, e.target.value)
                  }
                >
                  <option value="0">0%</option>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </select>

                <button
                  className="primary-button"
                  onClick={() => toggleComplete(goal.id)}
                >
                  {goal.completed
                    ? "↩️ Mark Incomplete"
                    : "✅ Mark Complete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GoalsPage;