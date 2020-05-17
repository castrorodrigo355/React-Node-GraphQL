import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const CREATE_MESSAGE = gql`
  mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
      title
      content
    }
  }
`;

const MessageForm = () => {
  const [message, setMessage] = useState({
    title: "",
    content: "",
    author: ""
  });
  const onChange = e =>
    setMessage({ ...message, [e.target.name]: e.target.value });

  return (
    <Mutation mutation={CREATE_MESSAGE}>
      {createMessage => (
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createMessage({ variables: { input: message } });
                  window.location.href = "/messageList";
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Write a Title..."
                    value={message.title}
                    name="title"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="5"
                    placeholder="Content..."
                    onChange={onChange}
                    value={message.content}
                    name="content"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    value={message.author}
                    name="author"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default MessageForm;
