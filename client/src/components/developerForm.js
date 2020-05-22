import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const CREATE_DEVELOPER = gql`
  mutation createDeveloper($input: InputDeveloper!) {
    createDeveloper(input: $input) {
      _id
      name
      language
      tech
    }
  }
`;

const MessageForm = () => {
  const [dev, setDev] = useState({
    name: "",
    language: "",
    tech: ""
  });
  const onChange = e => setDev({ ...dev, [e.target.name]: e.target.value });

  return (
    <Mutation mutation={CREATE_DEVELOPER}>
      {createDeveloper => (
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createDeveloper({ variables: { input: dev } });
                  window.location.href = "/developerList";
                }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={dev.title}
                    name="name"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="5"
                    placeholder="Language..."
                    onChange={onChange}
                    value={dev.language}
                    name="language"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Tech"
                    value={dev.tech}
                    name="tech"
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
