import React, { useState } from "react";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_DEVELOPER = gql`
  query developer($id: String!) {
    developer(id: $id) {
      _id
      name
      language
      tech
    }
  }
`;

const UPDATE_DEVELOPER = gql`
  mutation updateDeveloper($id: String!, $input: InputDeveloper!) {
    updateDeveloper(id: $id, input: $input) {
      _id
      name
      language
      tech
    }
  }
`;

export default function DeveloperEdit({ match }) {
  const id = match.params._id;

  const [dev, setDev] = useState({
    name: "",
    language: "",
    tech: ""
  });
  const onChange = e => setDev({ ...dev, [e.target.name]: e.target.value });

  const [updateDeveloper] = useMutation(UPDATE_DEVELOPER);

  return (
    <Query query={GET_DEVELOPER} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return (
          <div className="card m-2">
            <div className="card-body">
              <div className="row">
                <span className="badge badge-pill badge-info">
                  {data.developer.name}
                </span>
                <span className="badge badge-pill badge-info">
                  {data.developer.language}
                </span>
                <span className="badge badge-pill badge-info">
                  {data.developer.tech}
                </span>
              </div>
              <hr />
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const id = match.params._id;
                  await updateDeveloper({ variables: { id, input: dev } });
                  window.location.href = "/developerList";
                }}
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Insert new values please..."
                    name="name"
                    className="form-control"
                    value={dev.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="langauge">Language</label>
                  <input
                    type="text"
                    name="language"
                    placeholder="Insert new values please..."
                    className="form-control"
                    value={dev.language}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tech">Tech</label>
                  <input
                    type="text"
                    name="tech"
                    placeholder="Insert new values please..."
                    className="form-control"
                    value={dev.tech}
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
