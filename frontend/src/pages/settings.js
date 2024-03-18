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
    <div className="home">
      <h1 className="task-details">Settings</h1>

      <section className="task-details">
        <h2>Profile</h2>
        <form>
          <label>
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
        <h2>Appearance</h2>
        <label>
          Theme:
          {/* <select onChange={changeTheme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select> */}
        </label>
      </section>

      <section className="task-details">
        <h2>Notifications</h2>
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
      </section>

      {/* New section for displaying due dates */}
      <section className="task-details">
        <h2>Due Dates</h2>
      </section>
    </div>
  );
};

export default Settings;
