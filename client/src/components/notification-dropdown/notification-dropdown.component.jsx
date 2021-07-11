import React, { useEffect } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import NotificationItem from "../notification-item/notification-item.component";

import "./notification-dropdown.styless.scss";

const NotificationDropdown = ({
  notification = [],
  ToggleNotification,
  fetchAllNotification,
}) => {
  useEffect(() => {
    fetchAllNotification();
  }, [fetchAllNotification]);
  return (
    <div className="notoification">
      <div className="notoification__header">
        <h3 className="notoification__header--title">notification</h3>
        <FontAwesomeIcon
          className="notoification__header--close"
          icon={faTimes}
          onClick={ToggleNotification}
        />
      </div>
      <div className="notoification__notoifications">
        {notification.map((notification) => {
          return (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification.notification,
});

export default connect(mapStateToProps)(NotificationDropdown);
