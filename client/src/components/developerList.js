import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_DEVELOPERS = gql`
  query developers {
    developers {
      _id
      name
      language
      tech
    }
  }
`;

const DELETE_DEVELOPER = gql`
  mutation deleteDeveloper($id: String!) {
    deleteDeveloper(id: $id) {
      _id
      name
      language
      tech
    }
  }
`;

const DeveloperList = () => {
  const [deleteDeveloper] = useMutation(DELETE_DEVELOPER);

  return (
    <Query query={GET_DEVELOPERS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return data.developers.map(({ _id, name, language, tech }) => (
          <div key={_id} className="card-body border m-2">
            <div className="row">
              <div className="col-8">
                <h4>{name}</h4>
              </div>
              <div disabled className="col-4">
                <div>
                  <Link to={`/developerList/${_id}`}>
                    <span className="badge badge-pill badge-primary">
                      Details
                    </span>
                  </Link>
                </div>

                <div>
                  <span
                    style={{ cursor: "pointer" }}
                    className="badge badge-pill badge-danger "
                    onClick={async () => {
                      await deleteDeveloper({ variables: { id: _id } });
                      window.location.href = "/developerList";
                    }}
                  >
                    Delete
                  </span>
                </div>

                <div>
                  <Link to={`/developerList/edit/${_id}`}>
                    <span className="badge badge-pill badge-info">Edit</span>
                  </Link>
                </div>
              </div>
            </div>
            <h5>{language}</h5>
            <p>{tech}</p>
          </div>
        ));
      }}
    </Query>
  );
};

export default DeveloperList;
