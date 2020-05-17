import React, { useState } from "react";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_MESSAGE = gql`
  query message($id: String!) {
    message(id: $id) {
      _id
      title
      content
      author
    }
  }
`;

const UPDATE_MESSAGE = gql`
  mutation updateMessage($id: String!, $input: MessageInput!) {
    updateMessage(id: $id, input: $input) {
      title
      content
      author
    }
  }
`;

export default function MessageEdit({ match }) {
  const id = match.params._id;

  const [message, setMessage] = useState({
    title: "",
    content: "",
    author: ""
  });
  const onChange = e =>
    setMessage({ ...message, [e.target.name]: e.target.value });

  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  return (
    <Query query={GET_MESSAGE} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return (
          <div className="card m-2">
            <div className="card-body">
              <div className="row">
                <span className="badge badge-pill badge-info">
                  {data.message.title}
                </span>
                <span className="badge badge-pill badge-info">
                  {data.message.content}
                </span>
                <span className="badge badge-pill badge-info">
                  {data.message.author}
                </span>
              </div>
              <hr />
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const id = match.params._id;
                  await updateMessage({ variables: { id, input: message } });
                  window.location.href = "/messageList";
                }}
              >
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Insert new values please..."
                    name="title"
                    className="form-control"
                    value={message.title}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <input
                    type="text"
                    name="content"
                    placeholder="Insert new values please..."
                    className="form-control"
                    value={message.content}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Insert new values please..."
                    className="form-control"
                    value={message.author}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block">
                  Update
                </button>
              </form>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
