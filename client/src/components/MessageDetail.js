import React from "react";
import { Query } from "react-apollo";
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

const MessageDetail = ({ match }) => {
  const id = match.params._id;
  return (
    <Query query={GET_MESSAGE} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Error !</p>;
        return (
          <div className="card m-2">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <h4>{data.message.title}</h4>
                </div>
              </div>
              <p>{data.message.content}</p>
              <p>{data.message.author}</p>
            </div>
          </div>
        );
      }}
    </Query>
  );
};
export default MessageDetail;
