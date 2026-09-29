import { useState } from "react";

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState("");

  const events = [
    {
      id: 1,
      date: "2026-10-15",
      title: "Data Structures Exam",
      type: "Exam",
    },
    {
      id: 2,
      date: "2026-10-17",
      title: "OS Notes Submission",
      type: "Task",
    },
    {
      id: 3,
      date: "2026-10-19",
      title: "Operating Systems Exam",
      type: "Exam",
    },
    {
      id: 4,
      date: "2026-10-20",
      title: "Practice SQL Queries",
      type: "Task",
    },
    {
      id: 5,
      date: "2026-10-24",
      title: "DBMS Final Exam",
      type: "Exam",
    },
  ];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const getDateString = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
  };

  const selectedEvents = selectedDate
    ? getEventsForDate(selectedDate)
    : [];

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="calendar-page">

      {/* Header */}
      <div className="calendar-header">
        <div>
          <h1>Calendar 🗓️</h1>
          <p>
            View your exams, tasks and important study activities.
          </p>
        </div>

        <button
          className="today-button"
          onClick={goToToday}
        >
          Today
        </button>
      </div>

      {/* Calendar Card */}
      <div className="calendar-card">

        {/* Calendar Navigation */}
        <div className="calendar-navigation">

          <button onClick={previousMonth}>
            ◀
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button onClick={nextMonth}>
            ▶
          </button>

        </div>

        {/* Week Names */}
        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Days */}
        <div className="calendar-grid">

          {calendarDays.map((day, index) => {

            if (!day) {
              return (
                <div
                  className="calendar-day empty-day"
                  key={`empty-${index}`}
                ></div>
              );
            }

            const dateString = getDateString(day);
            const dayEvents = getEventsForDate(dateString);

            const isSelected = selectedDate === dateString;

            return (
              <button
                className={`calendar-day ${
                  isSelected ? "selected-day" : ""
                }`}
                key={day}
                onClick={() => setSelectedDate(dateString)}
              >

                <span className="calendar-day-number">
                  {day}
                </span>

                {dayEvents.length > 0 && (
                  <div className="calendar-event-dots">

                    {dayEvents.map((event) => (
                      <span
                        key={event.id}
                        className={
                          event.type === "Exam"
                            ? "exam-dot"
                            : "task-dot"
                        }
                        title={event.title}
                      ></span>
                    ))}

                  </div>
                )}

              </button>
            );
          })}

        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <span>
            <span className="legend-dot exam-dot"></span>
            Exam
          </span>

          <span>
            <span className="legend-dot task-dot"></span>
            Task
          </span>
        </div>

      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="selected-date-section">

          <h2>
            Events on {selectedDate}
          </h2>

          {selectedEvents.length === 0 ? (
            <div className="empty-calendar">
              <h3>No events found 📭</h3>
              <p>
                There are no study events on this date.
              </p>
            </div>
          ) : (
            <div className="calendar-list">

              {selectedEvents.map((event) => (
                <div
                  className="calendar-event"
                  key={event.id}
                >

                  <div className="calendar-event-icon">
                    {event.type === "Exam"
                      ? "📅"
                      : "📝"}
                  </div>

                  <div className="calendar-event-info">
                    <h2>{event.title}</h2>
                    <p>{event.date}</p>
                  </div>

                  <span
                    className={`calendar-event-type ${
                      event.type.toLowerCase()
                    }`}
                  >
                    {event.type}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default CalendarPage;