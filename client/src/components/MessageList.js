import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_MESSAGES = gql`
  query messages {
    messages {
      _id
      title
      content
      author
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: String!) {
    deleteMessage(id: $id) {
      _id
      title
      content
      author
    }
  }
`;

const MessageList = () => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  return (
    <Query query={GET_MESSAGES}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return data.messages.map(({ _id, title, content, author }) => (
          <div key={_id} className="card-body border m-2">
            <div className="row">
              <div className="col-8">
                <h4>{title}</h4>
              </div>
              <div className="col-4">
                <div>
                  <Link to={`/messageList/${_id}`}>
                    <span className="badge badge-pill badge-primary">
                      Content
                    </span>
                  </Link>
                </div>
                <div>
                  <span
                    style={{ cursor: "pointer" }}
                    className="badge badge-pill badge-danger "
                    onClick={async () => {
                      await deleteMessage({ variables: { id: _id } });
                      window.location.href = "/messageList";
                    }}
                  >
                    Delete
                  </span>
                </div>
                <div>
                  <Link to={`/messageList/edit/${_id}`}>
                    <span className="badge badge-pill badge-info">Edit</span>
                  </Link>
                </div>
              </div>
            </div>
            <h5>{content}</h5>
            <p>{author}</p>
          </div>
        ));
      }}
    </Query>
  );
};

export default MessageList;
