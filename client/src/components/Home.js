import React from "react";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm m-2">
          <div className="card">
            <img
              src={
                "data:image/png;base64,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"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h3 className="card-title">React Js (Apollo)</h3>
            </div>
          </div>
        </div>

        <div className="col-sm m-2">
          <div className="card">
            <img
              src={
                "data:image/png;base64,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"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h3 className="card-title">GraphQL (Mongo DB)</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
