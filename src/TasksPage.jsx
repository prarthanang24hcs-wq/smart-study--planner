import { useEffect, useState } from "react";

const defaultTasks = [
  {
    id: 1,
    title: "Complete Binary Trees Assignment",
    subject: "Data Structures",
    dueDate: "15 October",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare Process Scheduling Notes",
    subject: "Operating Systems",
    dueDate: "17 October",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Practice SQL Queries",
    subject: "Database Management",
    dueDate: "20 October",
    priority: "Low",
    completed: true,
  },
];

function TasksPage({ subjects = [] }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("smartStudyTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return defaultTasks;
  });

  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    dueDate: "",
    priority: "Medium",
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(
      "smartStudyTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const formatDate = (date) => {
    if (!date) return "";

    const selectedDate = new Date(date + "T00:00:00");

    return selectedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const addTask = () => {
    if (
      !newTask.title.trim() ||
      !newTask.subject ||
      !newTask.dueDate
    ) {
      alert(
        "Please fill in the task title, subject and due date."
      );
      return;
    }

    const task = {
      ...newTask,
      title: newTask.title.trim(),
      dueDate: formatDate(newTask.dueDate),
      id: Date.now(),
      completed: false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      task,
    ]);

    setNewTask({
      title: "",
      subject: "",
      dueDate: "",
      priority: "Medium",
    });

    setShowForm(false);
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="tasks-page">

      {/* PAGE HEADER */}

      <div className="tasks-header">

        <div>
          <h1>Tasks & Assignments 📝</h1>

          <p>
            Keep track of your assignments, deadlines and study tasks.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Task
        </button>

      </div>


      {/* TASK SUMMARY */}

      <div className="tasks-summary">

        <div className="tasks-summary-card">
          <span>📝</span>

          <div>
            <strong>{totalTasks}</strong>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="tasks-summary-card">
          <span>⏳</span>

          <div>
            <strong>{pendingTasks}</strong>
            <p>Pending</p>
          </div>
        </div>

        <div className="tasks-summary-card">
          <span>✅</span>

          <div>
            <strong>{completedTasks}</strong>
            <p>Completed</p>
          </div>
        </div>

      </div>


      {/* ADD TASK FORM */}

      {showForm && (
        <div className="tasks-form">

          <h2>Add New Task</h2>

          <div className="tasks-form-grid">

            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
            />

            <select
              value={newTask.subject}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
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
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate: e.target.value,
                })
              }
            />

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
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
              onClick={addTask}
            >
              Add Task
            </button>

          </div>

        </div>
      )}


      {/* TASK LIST */}

      <div className="tasks-list">

        {tasks.length === 0 ? (
          <div className="tasks-empty">

            <div>📝</div>

            <h2>No tasks yet</h2>

            <p>
              Click "+ Add Task" to create your first task.
            </p>

          </div>
        ) : (
          tasks.map((task) => (

            <div
              className={`task-card ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >

              <div className="task-left">

                <button
                  className="task-check"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <div className="task-info">

                  <div className="task-title-row">

                    <h2>{task.title}</h2>

                    <span
                      className={`priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                  </div>

                  <p className="task-subject">
                    📚 {task.subject}
                  </p>

                  <p className="task-due">
                    📅 Due: {task.dueDate}
                  </p>

                </div>

              </div>

              <button
                className="delete-button task-delete"
                onClick={() => deleteTask(task.id)}
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

export default TasksPage;