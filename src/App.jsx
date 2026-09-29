import { useState, useEffect } from "react";
import "./App.css";

import SubjectsPage from "./SubjectsPage";
import DashboardPage from "./DashboardPage";
import StudyPlannerPage from "./StudyPlannerPage";
import TasksPage from "./TasksPage";
import ExamsPage from "./ExamsPage";
import CalendarPage from "./CalendarPage";
import StudySessionsPage from "./StudySessionsPage";
import AnalyticsPage from "./AnalyticsPage";
import AIStudyAssistantPage from "./AIStudyAssistantPage";
import NotesPage from "./NotesPage";
import GoalsPage from "./GoalsPage";
import SettingsPage from "./SettingsPage";
import Login from "./Login";

function App() {

 /* LOGIN */

const [currentUser, setCurrentUser] = useState(() => {
  return localStorage.getItem("smartStudyCurrentUser") || "";
});

const isLoggedIn = currentUser !== "";


  /* CURRENT PAGE */
  const [currentPage, setCurrentPage] = useState("Dashboard");

  /* DEFAULT SUBJECTS */
  const defaultSubjects = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS301",
      teacher: "Prof. Sharma",
      progress: 75,
      grade: "A",
      priority: "High",
      tasks: 3,
    },
    {
      id: 2,
      name: "Operating Systems",
      code: "CS302",
      teacher: "Prof. Patil",
      progress: 60,
      grade: "A",
      priority: "Medium",
      tasks: 2,
    },
    {
      id: 3,
      name: "Database Management",
      code: "CS303",
      teacher: "Prof. Deshmukh",
      progress: 82,
      grade: "A+",
      priority: "High",
      tasks: 1,
    },
    {
      id: 4,
      name: "Computer Networks",
      code: "CS304",
      teacher: "Prof. Kulkarni",
      progress: 45,
      grade: "B+",
      priority: "Medium",
      tasks: 4,
    },
  ];

  /* SUBJECTS */
  const [subjects, setSubjects] = useState(() => {
  try {
    const savedSubjects = localStorage.getItem(
      `smartStudySubjects_${localStorage.getItem("smartStudyCurrentUser")}`
    );

    if (savedSubjects) {
      const parsedSubjects = JSON.parse(savedSubjects);

      if (
        Array.isArray(parsedSubjects) &&
        parsedSubjects.length > 0
      ) {
        return parsedSubjects;
      }
    }
  } catch (error) {
    console.log(
      "Could not load saved subjects:",
      error
    );
  }

  return defaultSubjects;
});
/* LOAD SUBJECTS WHEN USER CHANGES */
useEffect(() => {
  if (!currentUser) return;

  const savedSubjects = localStorage.getItem(
    `smartStudySubjects_${currentUser}`
  );

  if (savedSubjects) {
    try {
      setSubjects(JSON.parse(savedSubjects));
    } catch (error) {
      console.log("Could not load user subjects:", error);
      setSubjects([]);
    }
  } else {
    setSubjects([]);
  }
}, [currentUser]);

  

  /* LOGIN SCREEN */
  if (!isLoggedIn) {
    return (
      <Login
  onLogin={(email) => {
    localStorage.setItem("smartStudyCurrentUser", email);
    setCurrentUser(email);
    setCurrentPage("Dashboard");
  }}
/>
    );
  }


  /* MAIN WEBSITE */
  return (
    <div className="app">

      {/* TOP BAR */}
      <header className="topbar">

        <div className="logo">
          📚 Smart Study Planner
        </div>

        <div className="top-right">

          <button className="notification">
            🔔
          </button>

          <div className="profile">
            <div className="avatar">P</div>
            <span>Prarthana</span>
          </div>

        </div>

      </header>


      {/* MAIN AREA */}
      <div className="main-layout">


        {/* SIDEBAR */}
        <aside className="sidebar">

          <nav>

            {/* DASHBOARD */}
            <button
              className={`nav-item ${
                currentPage === "Dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Dashboard")
              }
            >
              📊
              <span>Dashboard</span>
            </button>


            {/* SUBJECTS */}
            <button
              className={`nav-item ${
                currentPage === "My Subjects"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("My Subjects")
              }
            >
              📚
              <span>My Subjects</span>
            </button>


            {/* NOTES */}
            <button
              className={`nav-item ${
                currentPage === "Notes"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Notes")
              }
            >
              📝
              <span>Notes</span>
            </button>


            {/* STUDY PLANNER */}
            <button
              className={`nav-item ${
                currentPage === "Study Planner"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Study Planner")
              }
            >
              🗓️
              <span>Study Planner</span>
            </button>


            {/* TASKS */}
            <button
              className={`nav-item ${
                currentPage === "Tasks"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Tasks")
              }
            >
              📝
              <span>Tasks & Assignments</span>
            </button>


            {/* EXAMS */}
            <button
              className={`nav-item ${
                currentPage === "Exams"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Exams")
              }
            >
              📅
              <span>Exams</span>
            </button>


            {/* CALENDAR */}
            <button
              className={`nav-item ${
                currentPage === "Calendar"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Calendar")
              }
            >
              🗓️
              <span>Calendar</span>
            </button>


            {/* STUDY SESSIONS */}
            <button
              className={`nav-item ${
                currentPage === "Study Sessions"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Study Sessions")
              }
            >
              ⏱️
              <span>Study Sessions</span>
            </button>


            {/* ANALYTICS */}
            <button
              className={`nav-item ${
                currentPage === "Analytics"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Analytics")
              }
            >
              📈
              <span>Analytics</span>
            </button>


            {/* AI ASSISTANT */}
            <button
              className={`nav-item ${
                currentPage === "AI Assistant"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("AI Assistant")
              }
            >
              🤖
              <span>AI Study Assistant</span>
            </button>


            {/* GOALS */}
            <button
              className={`nav-item ${
                currentPage === "Goals"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Goals")
              }
            >
              🎯
              <span>Goals</span>
            </button>


            {/* SETTINGS */}
            <button
              className={`nav-item ${
                currentPage === "Settings"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage("Settings")
              }
            >
              ⚙️
              <span>Settings</span>
            </button>


            {/* LOGOUT */}
            <button
              className="nav-item"
              onClick={() => {
  localStorage.removeItem("smartStudyCurrentUser");
  setCurrentUser("");
}}
            >
              🚪
              <span>Logout</span>
            </button>

          </nav>

        </aside>


        {/* PAGE CONTENT */}
        <main className="content">

          {currentPage === "Dashboard" && (
            <DashboardPage
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === "My Subjects" && (
  <SubjectsPage
    subjects={subjects}
    setSubjects={setSubjects}
    userEmail={currentUser}
  />
)}

          {currentPage === "Notes" && (
            <NotesPage />
          )}

          {currentPage === "Study Planner" && (
            <StudyPlannerPage
              subjects={subjects}
            />
          )}

          {currentPage === "Tasks" && (
            <TasksPage
              subjects={subjects}
            />
          )}

          {currentPage === "Exams" && (
            <ExamsPage
              subjects={subjects}
            />
          )}

          {currentPage === "Calendar" && (
            <CalendarPage />
          )}

          {currentPage === "Study Sessions" && (
            <StudySessionsPage
              subjects={subjects}
            />
          )}

          {currentPage === "Analytics" && (
            <AnalyticsPage />
          )}

          {currentPage === "AI Assistant" && (
            <AIStudyAssistantPage />
          )}

          {currentPage === "Goals" && (
            <GoalsPage />
          )}

          {currentPage === "Settings" && (
            <SettingsPage />
          )}

        </main>

      </div>

    </div>
  );
}

export default App;