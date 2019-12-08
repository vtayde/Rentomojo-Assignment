import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import userAction from "../action";

class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <div className="cardContainer">
          <div
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "500",
              width: "100%",
              color: "#dc3226"
            }}
          >
            Page Not Found!!!
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageNotFound;
