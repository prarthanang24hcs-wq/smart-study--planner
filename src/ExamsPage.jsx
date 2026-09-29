import { useEffect, useState } from "react";

const defaultExams = [
  {
    id: 1,
    name: "Data Structures Final Exam",
    subject: "Data Structures",
    date: "15 October",
    time: "10:00 AM",
    location: "Room 204",
    status: "Preparing",
  },
  {
    id: 2,
    name: "Operating Systems Final Exam",
    subject: "Operating Systems",
    date: "19 October",
    time: "2:00 PM",
    location: "Room 301",
    status: "Not Started",
  },
  {
    id: 3,
    name: "DBMS Final Exam",
    subject: "Database Management",
    date: "24 October",
    time: "10:00 AM",
    location: "Room 105",
    status: "Preparing",
  },
];

function ExamsPage({ subjects = [] }) {
  const [exams, setExams] = useState(() => {
    const savedExams = localStorage.getItem("smartStudyExams");

    if (savedExams) {
      return JSON.parse(savedExams);
    }

    return defaultExams;
  });

  const [showForm, setShowForm] = useState(false);

  const [newExam, setNewExam] = useState({
    name: "",
    subject: "",
    date: "",
    time: "",
    location: "",
    status: "Not Started",
  });

  // Save exams whenever they change
  useEffect(() => {
    localStorage.setItem(
      "smartStudyExams",
      JSON.stringify(exams)
    );
  }, [exams]);

  const formatDate = (date) => {
    if (!date) return "";

    const selectedDate = new Date(date + "T00:00:00");

    return selectedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
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

  const addExam = () => {
    if (
      !newExam.name.trim() ||
      !newExam.subject ||
      !newExam.date ||
      !newExam.time
    ) {
      alert(
        "Please fill in the exam name, subject, date and time."
      );
      return;
    }

    const exam = {
      ...newExam,
      id: Date.now(),
      name: newExam.name.trim(),
      date: formatDate(newExam.date),
      time: formatTime(newExam.time),
    };

    setExams((previousExams) => [
      ...previousExams,
      exam,
    ]);

    setNewExam({
      name: "",
      subject: "",
      date: "",
      time: "",
      location: "",
      status: "Not Started",
    });

    setShowForm(false);
  };

  const deleteExam = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmed) return;

    setExams((previousExams) =>
      previousExams.filter((exam) => exam.id !== id)
    );
  };

  const totalExams = exams.length;

  const preparingExams = exams.filter(
    (exam) => exam.status === "Preparing"
  ).length;

  const readyExams = exams.filter(
    (exam) => exam.status === "Ready"
  ).length;

  return (
    <div className="exams-page">

      {/* PAGE HEADER */}

      <div className="exams-header">

        <div>
          <h1>Exams 📅</h1>

          <p>
            Keep track of your upcoming exams and preparation status.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Exam
        </button>

      </div>


      {/* EXAM SUMMARY */}

      <div className="exams-summary">

        <div className="exams-summary-card">
          <span>📅</span>

          <div>
            <strong>{totalExams}</strong>
            <p>Total Exams</p>
          </div>
        </div>

        <div className="exams-summary-card">
          <span>📚</span>

          <div>
            <strong>{preparingExams}</strong>
            <p>Preparing</p>
          </div>
        </div>

        <div className="exams-summary-card">
          <span>✅</span>

          <div>
            <strong>{readyExams}</strong>
            <p>Ready</p>
          </div>
        </div>

      </div>


      {/* ADD EXAM FORM */}

      {showForm && (
        <div className="exams-form">

          <h2>Add New Exam</h2>

          <div className="exams-form-grid">

            <input
              type="text"
              placeholder="Exam Name"
              value={newExam.name}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  name: e.target.value,
                })
              }
            />

            <select
              value={newExam.subject}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
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
              type="date"
              value={newExam.date}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  date: e.target.value,
                })
              }
            />

            <input
              type="time"
              value={newExam.time}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  time: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Exam Location (optional)"
              value={newExam.location}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  location: e.target.value,
                })
              }
            />

            <select
              value={newExam.status}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  status: e.target.value,
                })
              }
            >
              <option value="Not Started">
                Not Started
              </option>

              <option value="Preparing">
                Preparing
              </option>

              <option value="Ready">
                Ready
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
              onClick={addExam}
            >
              Add Exam
            </button>

          </div>

        </div>
      )}


      {/* EXAM LIST */}

      <div className="exams-list">

        {exams.length === 0 ? (
          <div className="exams-empty">

            <div>📅</div>

            <h2>No exams added yet</h2>

            <p>
              Click "+ Add Exam" to add your upcoming exam.
            </p>

          </div>
        ) : (
          exams.map((exam) => (

            <div
              className="exam-card"
              key={exam.id}
            >

              <div className="exam-main">

                <div className="exam-icon">
                  📅
                </div>

                <div className="exam-info">

                  <div className="exam-title-row">

                    <h2>{exam.name}</h2>

                    <span
                      className={`exam-status ${exam.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {exam.status}
                    </span>

                  </div>

                  <p className="exam-subject">
                    📚 {exam.subject}
                  </p>

                  <div className="exam-details">

                    <span>
                      📅 {exam.date}
                    </span>

                    <span>
                      🕐 {exam.time}
                    </span>

                    <span>
                      📍{" "}
                      {exam.location ||
                        "Location not added"}
                    </span>

                  </div>

                </div>

              </div>


              <button
                className="delete-button exam-delete"
                onClick={() =>
                  deleteExam(exam.id)
                }
              >
                🗑️ Delete
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default ExamsPage;