import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import userAction from "../action";

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  getUserDetail = id => {
    this.props.history.push(`/userPosts/${id}`);
  };
  render() {
    return (
      <Fragment>
        <div className="subHeader">USERS</div>
        <div className="cardContainer">
          {this.props.userList.length
            ? this.props.userList.map(ele => {
                return (
                  <div className="card" key={ele.id}>
                    <div className="cardHeader">{ele.name}</div>
                    <div
                      className="link"
                      onClick={() => this.getUserDetail(ele.id)}
                    >
                      Blog Post
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = store => {
  return {
    userList: store.reducer.userList
  };
};
const mapActionsToProps = {
  getUsers: userAction.getUsers,
  setUserName: userAction.setUserName
};
export default connect(mapStateToProps, mapActionsToProps)(withRouter(Users));
