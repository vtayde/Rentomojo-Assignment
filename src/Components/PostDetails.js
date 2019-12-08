import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Button, Icon } from "antd";
import userAction from "../action";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      postId: {
        id: props.match.params.id
      }
    };
  }
  componentDidMount() {
    if (!this.props.userName.name) {
      this.props.setUserName({
        name: JSON.parse(JSON.stringify(localStorage.getItem("name"))),
        company: JSON.parse(JSON.stringify(localStorage.getItem("company")))
      });
    }
    this.props.getPostDetails(this.state.postId);
  }
  onClickComments = () => {
    this.props.getComments(this.state.postId);
    this.setState(preState => {
      return {
        showComments: !preState.showComments
      };
    });
  };
  onDeletePost = () => {
    this.props.deletePost(this.state.postId).then(resp => {
      if (resp) {
        this.props.history.push(`/userPosts/${this.props.postDetails.userId}`);
      }
    });
  };
  render() {
    return (
      <Fragment>
        <div className="subHeader">POST DETAILS</div>
        <div className="listContainer">
          <div className="postHeader">
            <div>User: {this.props.userName.name} </div>
            <div>Company: {this.props.userName.company}</div>
          </div>
          <div className="postDetailsContainer">
            <div className="postDetail" style={{ fontWeight: "700" }}>
              <div className="postName">Title</div>
              <div className="postBody">Body</div>
              <div className="deletePost">Action</div>
            </div>
            <div className="postDetail">
              <div className="postName">{this.props.postDetails.title}</div>
              <div className="postBody">{this.props.postDetails.body}</div>
              <div className="deletePost">
                <Button onClick={this.onDeletePost}>
                  <Icon type="delete" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="postDetail" style={{ padding: "1rem" }}>
            <Button onClick={this.onClickComments}>
              {this.state.showComments ? "Hide Comments" : "Show Comments"}
            </Button>
          </div>
          {this.state.showComments ? (
            <div className="commentsContainer">
              <List
                itemLayout="vertical"
                size="small"
                dataSource={this.props.comments}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<span style={{ color: "grey" }}>{item.body}</span>}
                    />
                  </List.Item>
                )}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    postDetails: store.reducer.postDetails,
    comments: store.reducer.comments,
    userName: store.reducer.userName
  };
};
const mapActionsToProps = {
  getPostDetails: userAction.getPostDetails,
  getComments: userAction.getComments,
  deletePost: userAction.deletePost,
  setUserName: userAction.setUserName
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(PostDetails));
