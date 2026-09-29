import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

function AnalyticsPage() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSubjects = localStorage.getItem("smartStudySubjects");
    const savedTasks = localStorage.getItem("smartStudyTasks");
    const savedSessions = localStorage.getItem("smartStudySessions");

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Convert duration like "60 minutes" or "1 hour"
  // into hours.
  const getHours = (duration) => {
    if (!duration) return 0;

    const text = duration.toLowerCase();

    const numberMatch = text.match(/[\d.]+/);

    if (!numberMatch) return 0;

    const number = Number(numberMatch[0]);

    if (text.includes("hour") || text.includes("hr")) {
      return number;
    }

    return number / 60;
  };

  // Total study hours
  const totalStudyHours = sessions.reduce(
    (total, session) => {
      return total + getHours(session.duration);
    },
    0
  );

  // Tasks
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  // Subject progress
  const subjectProgress = subjects.map((subject) => ({
    subject: subject.name,
    progress: Number(subject.progress) || 0,
  }));

  const averageProgress =
    subjectProgress.length > 0
      ? subjectProgress.reduce(
          (total, subject) =>
            total + subject.progress,
          0
        ) / subjectProgress.length
      : 0;

  // Weekly study hours
  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const studyHours = weekDays.map((day) => ({
    day,
    hours: 0,
  }));

  sessions.forEach((session) => {
    if (!session.date) return;

    const date = new Date(session.date);

    if (isNaN(date.getTime())) return;

    const dayName = weekDays[date.getDay()];

    const dayData = studyHours.find(
      (item) => item.day === dayName
    );

    if (dayData) {
      dayData.hours += getHours(session.duration);
    }
  });

  // Round weekly hours
  studyHours.forEach((item) => {
    item.hours = Number(item.hours.toFixed(1));
  });

  // Task chart data
  const taskData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  // Study streak
  const completedSessionDates = sessions
    .filter((session) => session.completed)
    .map((session) => session.date)
    .filter(Boolean);

  const uniqueDates = [
    ...new Set(completedSessionDates),
  ];

  const studyStreak = uniqueDates.length;

  return (
    <div className="analytics-page">

      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>Analytics 📈</h1>

          <p>
            Track your study progress and understand your
            learning habits.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="analytics-stats">

        <div className="analytics-stat-card">
          <span>📚</span>

          <div>
            <p>Total Study Hours</p>

            <h2>
              {totalStudyHours.toFixed(1)} hrs
            </h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <span>✅</span>

          <div>
            <p>Tasks Completed</p>

            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <span>🎯</span>

          <div>
            <p>Average Progress</p>

            <h2>
              {averageProgress.toFixed(1)}%
            </h2>
          </div>
        </div>

        <div className="analytics-stat-card">
          <span>🔥</span>

          <div>
            <p>Study Days</p>

            <h2>{studyStreak}</h2>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="analytics-grid">

        {/* Weekly Study Hours */}
        <div className="analytics-card">

          <h2>Weekly Study Hours</h2>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={studyHours}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="hours"
                  fill="#4f46e5"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Task Completion */}
        <div className="analytics-card">

          <h2>Task Completion</h2>

          <div className="pie-container">

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#4f46e5" />
                  <Cell fill="#e5e7eb" />
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="chart-legend">

            <span>
              🟣 Completed: {completedTasks}
            </span>

            <span>
              ⚪ Pending: {pendingTasks}
            </span>

          </div>

        </div>

      </div>

      {/* SUBJECT PROGRESS */}
      <div className="analytics-card subject-progress-card">

        <h2>Subject Progress</h2>

        {subjectProgress.length === 0 ? (
          <div className="empty-analytics">
            <h3>No subjects found 📚</h3>

            <p>
              Add subjects and update their progress
              to see your analytics.
            </p>
          </div>
        ) : (
          <div className="analytics-subject-list">

            {subjectProgress.map((subject) => (

              <div
                className="analytics-subject"
                key={subject.subject}
              >

                <div className="analytics-subject-header">

                  <span>
                    {subject.subject}
                  </span>

                  <strong>
                    {subject.progress}%
                  </strong>

                </div>

                <div className="analytics-progress-bar">

                  <div
                    className="analytics-progress-fill"
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default AnalyticsPage;