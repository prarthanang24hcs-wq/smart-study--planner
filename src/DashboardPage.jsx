import { useEffect, useState } from "react";

function DashboardPage({ setCurrentPage, userEmail }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!userEmail) {
      setSubjects([]);
      return;
    }

    const savedSubjects = localStorage.getItem(
      `smartStudySubjects_${userEmail}`
    );

    if (savedSubjects) {
      try {
        setSubjects(JSON.parse(savedSubjects));
      } catch (error) {
        console.log("Could not load dashboard subjects:", error);
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
  }, [userEmail]);

  const displayName = userEmail
    ? userEmail.split("@")[0]
    : "Student";

  const formattedName =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <>
      {/* WELCOME */}
      <section className="welcome">
        <div>
          <h1>
            Good Morning, {formattedName} 👋
          </h1>

          <p>
            Here's your study overview for today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setCurrentPage("Study Planner")}
        >
          + Add Study Session
        </button>
      </section>

      {/* STATISTICS */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            📚
          </div>

          <div>
            <p>My Subjects</p>
            <h2>{subjects.length}</h2>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setCurrentPage("Tasks")}
          style={{ cursor: "pointer" }}
        >
          <div className="stat-icon purple">
            📝
          </div>

          <div>
            <p>Pending Tasks</p>
            <h2>0</h2>
          </div>
        </div>

        <div
          className="stat-card"
          onClick={() => setCurrentPage("Exams")}
          style={{ cursor: "pointer" }}
        >
          <div className="stat-icon orange">
            📅
          </div>

          <div>
            <p>Upcoming Exams</p>
            <h2>0</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            🔥
          </div>

          <div>
            <p>Study Streak</p>
            <h2>0 days</h2>
          </div>
        </div>

      </section>

      {/* TWO DASHBOARD CARDS */}
      <section className="dashboard-grid">

        {/* STUDY PLAN */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>My Subjects</h2>

              <p>
                Your current subjects
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => setCurrentPage("My Subjects")}
            >
              View All
            </button>
          </div>

          {subjects.length === 0 ? (
            <div className="study-item">
              <div className="study-info">
                <h3>No subjects added yet</h3>

                <p>
                  Add your first subject to get started.
                </p>
              </div>
            </div>
          ) : (
            subjects.slice(0, 3).map((subject) => (
              <div className="study-item" key={subject.id}>

                <div className="study-info">
                  <h3>
                    {subject.name}
                  </h3>

                  <p>
                    {subject.code || "No subject code"}
                  </p>
                </div>

                <span
                  className={`badge ${
                    subject.priority?.toLowerCase() || "medium"
                  }`}
                >
                  {subject.priority || "Medium"}
                </span>

              </div>
            ))
          )}

        </div>

        {/* EXAMS */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>
                Upcoming Exams
              </h2>

              <p>
                Don't miss your deadlines
              </p>
            </div>

          </div>

          <div
            className="exam-item"
            onClick={() => setCurrentPage("Exams")}
            style={{ cursor: "pointer" }}
          >

            <div>
              <h3>
                View Your Exams
              </h3>

              <p>
                Open the Exams section
              </p>
            </div>

            <strong>
              →
            </strong>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="action-grid">

          {/* ADD SUBJECT */}
          <button
            className="action-card"
            onClick={() => setCurrentPage("My Subjects")}
          >

            <span>📚</span>

            <div>
              <strong>
                Add Subject
              </strong>

              <small>
                Create a new subject
              </small>
            </div>

          </button>

          {/* ADD TASK */}
          <button
            className="action-card"
            onClick={() => setCurrentPage("Tasks")}
          >

            <span>📝</span>

            <div>
              <strong>
                Add Task
              </strong>

              <small>
                Create an assignment
              </small>
            </div>

          </button>

          {/* AI STUDY PLAN */}
          <button
            className="action-card"
            onClick={() => setCurrentPage("AI Assistant")}
          >

            <span>🤖</span>

            <div>
              <strong>
                Generate Study Plan
              </strong>

              <small>
                Let AI plan your studies
              </small>
            </div>

          </button>

          {/* STUDY SESSION */}
          <button
            className="action-card"
            onClick={() => setCurrentPage("Study Sessions")}
          >

            <span>▶️</span>

            <div>
              <strong>
                Start Study Session
              </strong>

              <small>
                Track your study time
              </small>
            </div>

          </button>

        </div>

      </section>

    </>
  );
}

export default DashboardPage;