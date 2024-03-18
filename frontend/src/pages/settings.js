import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare as filledSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare as outlinedSquare } from "@fortawesome/free-regular-svg-icons";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  // const nodemailer = require("nodemailer");

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };
  return (
    <div className="home-settings">
      <h1 className="task-details-name">Settings</h1>

      <div className="settings-container">
        <div className="left-section">
          <section className="task-details">
            <h2>Appearance</h2>
            <label>
              Theme:
              {/* <select onChange={changeTheme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select> */}
            </label>
          </section>

          {/* New section for displaying due dates */}
          <section className="task-details">
            <h2>Due Dates</h2>
          </section>
        </div>

        <div className="right-section">
          <section className="task-details">
            <h2>Profile</h2>
            <form className="form-username">
              <label className="Username-Input-Form">
                Username:
                <input type="text" name="username" />
              </label>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <button type="submit">Save</button>
            </form>
          </section>
          <section className="task-details">
            <h2 className="notification-options-h2">Notification options</h2>
            <div className="notifications">
              <label>
                Email Notifications:
                <FontAwesomeIcon
                  style={{ marginLeft: "50px" }}
                  icon={emailNotifications ? filledSquare : outlinedSquare}
                  color={emailNotifications ? "green" : "grey"}
                  onClick={toggleEmailNotifications}
                />
              </label>
              <label>
                Push Notifications:
                <FontAwesomeIcon
                  style={{ marginLeft: "55px" }}
                  icon={pushNotifications ? filledSquare : outlinedSquare}
                  color={pushNotifications ? "green" : "grey"}
                  onClick={togglePushNotifications}
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
