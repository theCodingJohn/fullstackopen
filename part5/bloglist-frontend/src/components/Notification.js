import React from "react";

const Notification = ({ message, type }) => {
  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  switch (type) {
    case "successful":
      style.color = "green";
      break;
    default:
      style.color = "red";
  }

  if (!!message) {
    return (
      <div className="notif" style={style}>
        {message}
      </div>
    );
  }
  return null;
};

export default Notification;
