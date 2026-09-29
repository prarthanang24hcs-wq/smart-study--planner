import { useEffect, useState } from "react";

function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("smartStudySettings");

    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          name: "Student",
          email: "",
          notifications: true,
          reminders: true,
          darkMode: false,
          dailyGoal: 2,
        };
  });
  useEffect(() => {
  document.body.classList.toggle(
    "dark-mode",
    settings.darkMode
  );
}, [settings.darkMode]);


  useEffect(() => {
    localStorage.setItem(
      "smartStudySettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    const defaultSettings = {
      name: "Student",
      email: "",
      notifications: true,
      reminders: true,
      darkMode: false,
      dailyGoal: 2,
    };

    setSettings(defaultSettings);
    alert("Settings have been reset.");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <div>
          <h1>Settings ⚙️</h1>
          <p>
            Manage your profile and study preferences.
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="settings-card">

        <h2>👤 Profile</h2>

        <div className="settings-form">

          <div className="settings-field">
            <label>Student Name</label>

            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                updateSetting("name", e.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                updateSetting("email", e.target.value)
              }
              placeholder="Enter your email"
            />
          </div>

        </div>

      </div>

      {/* Study Preferences */}
      <div className="settings-card">

        <h2>📚 Study Preferences</h2>

        <div className="settings-field">

          <label>
            Daily Study Goal
          </label>

          <select
            value={settings.dailyGoal}
            onChange={(e) =>
              updateSetting(
                "dailyGoal",
                Number(e.target.value)
              )
            }
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">5 hours</option>
            <option value="6">6 hours</option>
            <option value="8">8 hours</option>
          </select>

        </div>

      </div>

      {/* Notifications */}
      <div className="settings-card">

        <h2>🔔 Notifications</h2>

        <div className="setting-row">

          <div>
            <strong>Notifications</strong>

            <p>
              Receive study and task notifications.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                updateSetting(
                  "notifications",
                  e.target.checked
                )
              }
            />

            <span className="toggle-slider"></span>

          </label>

        </div>

        <div className="setting-row">

          <div>
            <strong>Study Reminders</strong>

            <p>
              Get reminders for your planned study sessions.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={settings.reminders}
              onChange={(e) =>
                updateSetting(
                  "reminders",
                  e.target.checked
                )
              }
            />

            <span className="toggle-slider"></span>

          </label>

        </div>

      </div>

      {/* Appearance */}
      <div className="settings-card">

        <h2>🎨 Appearance</h2>

        <div className="setting-row">

          <div>
            <strong>Dark Mode</strong>

            <p>
              Change the appearance of the study planner.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                updateSetting(
                  "darkMode",
                  e.target.checked
                )
              }
            />

            <span className="toggle-slider"></span>

          </label>

        </div>

      </div>

      {/* Save / Reset */}
      <div className="settings-actions">

        <button
          className="primary-button"
          onClick={() =>
            alert("Settings saved successfully!")
          }
        >
          💾 Save Settings
        </button>

        <button
          className="settings-reset-button"
          onClick={resetSettings}
        >
          🔄 Reset Settings
        </button>

      </div>

    </div>
  );
}

export default SettingsPage;