import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  switch (notification.type) {
    case "successful":
      style.color = "green";
      break;
    default:
      style.color = "red";
  }

  if (notification.message !== null) {
    return (
      <div className="notif" style={style}>
        {notification.message}
      </div>
    );
  }
  return null;
};

export default Notification;
