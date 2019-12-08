import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import userAction from "../action";
import { List } from "antd";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts({
      id: this.props.match.params.id,
      skip: 0,
      limit: 5
    });
    if (window.localStorage.getItem("name")) {
      this.props.setUserName({
        name: JSON.parse(JSON.stringify(localStorage.getItem("name"))),
        company: JSON.parse(JSON.stringify(localStorage.getItem("company")))
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.userList.length &&
      (prevProps.posts !== this.props.posts ||
        prevProps.userList !== this.props.userList)
    ) {
      let userList = this.props.userList.filter(
        userObj => parseInt(this.props.match.params.id) === userObj.id
      );
      this.props.setUserName({
        name: userList[0].name,
        company: userList[0].company.name
      });
      window.localStorage.setItem("name", userList[0].name);
      window.localStorage.setItem("company", userList[0].company.name);
    }
  }
  render() {
    return (
      <Fragment>
        <div className="subHeader">POSTS</div>
        <div className="listContainer">
          <div className="postHeader">
            <div>User: {this.props.userName.name} </div>
            <div>Company: {this.props.userName.company}</div>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5
            }}
            grid={{ gutter: 12, column: 1, offset: 2, size: "small" }}
            bordered
            dataSource={this.props.posts}
            renderItem={item => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  title={
                    <a
                      onClick={val => {
                        this.props.history.push(`/postDetails/${item.id}`);
                      }}
                      href={item.href}
                    >
                      {
                        <span style={{ fontSize: "18px", color: "#1890FF" }}>
                          {item.title}
                        </span>
                      }
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    posts: store.reducer.posts,
    userName: store.reducer.userName,
    userList: store.reducer.userList
  };
};
const mapActionsToProps = {
  getPosts: userAction.getPosts,
  getUsers: userAction.getUsers,
  setUserName: userAction.setUserName
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Posts));
