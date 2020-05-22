import React from "react";
import { Query } from "react-apollo";
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

const DeveloperDetail = ({ match }) => {
  const id = match.params._id;
  console.log(id);
  return (
    <Query query={GET_DEVELOPER} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return (
          <div className="card m-2">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <h4>Name: {data.developer.name}</h4>
                </div>
              </div>
              <p>Langauge: {data.developer.language}</p>
              <p>Tech: {data.developer.tech}</p>
            </div>
          </div>
        );
      }}
    </Query>
  );
};
export default DeveloperDetail;
