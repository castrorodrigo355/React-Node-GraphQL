import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const DELETE_ALL_MESSAGES = gql`
  mutation deleteAllMessages($id: String!) {
    deleteAllMessages(id: $id)
  }
`;

export const Navigation = () => {
  const [deleteAllMessages] = useMutation(DELETE_ALL_MESSAGES);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <Link className="navbar-brand" to="/">
        ReactQL
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/messageList">
              Messages
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-message">
              Create Message
            </Link>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <span
              className="nav-link"
              onClick={async () => {
                await deleteAllMessages({ variables: { id: "1" } });
                window.location.href = "/messageList";
              }}
            >
              Delete All
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};
