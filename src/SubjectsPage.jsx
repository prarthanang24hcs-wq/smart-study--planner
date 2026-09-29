import { useEffect, useState } from "react";

function SubjectsPage({ subjects, setSubjects, userEmail }) {
  const [showForm, setShowForm] = useState(false);

  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    teacher: "",
    progress: 0,
    grade: "A",
    priority: "Medium",
    tasks: 0,
  });

  // Save subjects whenever they change
  useEffect(() => {
    localStorage.setItem(
  `smartStudySubjects_${userEmail}`,
  JSON.stringify(subjects)
);

  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.name || !newSubject.code) {
      alert("Please enter the subject name and subject code.");
      return;
    }

    const subject = {
      ...newSubject,
      id: Date.now(),
      progress: Number(newSubject.progress),
      tasks: Number(newSubject.tasks),
    };

    setSubjects((prevSubjects) => [
      ...prevSubjects,
      subject,
    ]);

    setNewSubject({
      name: "",
      code: "",
      teacher: "",
      progress: 0,
      grade: "A",
      priority: "Medium",
      tasks: 0,
    });

    setShowForm(false);
  };

  const deleteSubject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmed) {
      return;
    }

    setSubjects((prevSubjects) =>
      prevSubjects.filter(
        (subject) => subject.id !== id
      )
    );
  };

  return (
    <div className="subjects-page">

      {/* PAGE HEADER */}

      <div className="subjects-header">

        <div>
          <h1>My Subjects 📚</h1>

          <p>
            Manage your subjects and track your academic progress.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Subject
        </button>

      </div>

      {/* ADD SUBJECT FORM */}

      {showForm && (

        <div className="subject-form">

          <h2>Add New Subject</h2>

          <div className="form-grid">

            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Subject Code"
              value={newSubject.code}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  code: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Teacher Name"
              value={newSubject.teacher}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  teacher: e.target.value,
                })
              }
            />

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Progress %"
              value={newSubject.progress}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  progress: e.target.value,
                })
              }
            />

            <select
              value={newSubject.grade}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  grade: e.target.value,
                })
              }
            >
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>

            <select
              value={newSubject.priority}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  priority: e.target.value,
                })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <input
              type="number"
              min="0"
              placeholder="Pending Tasks"
              value={newSubject.tasks}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  tasks: e.target.value,
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
              onClick={addSubject}
            >
              Add Subject
            </button>

          </div>

        </div>

      )}

      {/* SUBJECT CARDS */}

      <div className="subjects-grid">

        {subjects.length === 0 ? (

          <div className="empty-subjects">
            <h2>No subjects yet 📚</h2>

            <p>
              Add your first subject to start tracking
              your academic progress.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              + Add Subject
            </button>
          </div>

        ) : (

          subjects.map((subject) => (

            <div
              className="subject-card"
              key={subject.id}
            >

              <div className="subject-top">

                <div>
                  <h2>{subject.name}</h2>

                  <p>{subject.code}</p>
                </div>

                <span
                  className={`priority ${subject.priority.toLowerCase()}`}
                >
                  {subject.priority}
                </span>

              </div>

              <div className="teacher">
                👨‍🏫

                <span>
                  {subject.teacher || "Teacher not added"}
                </span>
              </div>

              <div className="subject-details">

                <div>
                  <span>Target Grade</span>
                  <strong>{subject.grade}</strong>
                </div>

                <div>
                  <span>Pending Tasks</span>
                  <strong>{subject.tasks}</strong>
                </div>

              </div>

              <div className="progress-section">

                <div className="progress-label">

                  <span>Progress</span>

                  <strong>
                    {subject.progress}%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  />

                </div>

              </div>

              <button
                className="delete-button"
                onClick={() =>
                  deleteSubject(subject.id)
                }
              >
                🗑️ Delete Subject
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default SubjectsPage;