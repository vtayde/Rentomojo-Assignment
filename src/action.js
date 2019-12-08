import api from "./apiHelper";

const userAction = {
  setUserName: payload => {
    return dispatch => {
      dispatch({
        type: "USER_NAME",
        payload: payload
      });
    };
  },
  getUsers: payload => {
    return dispatch => {
      return api({
        url: `/users`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            resp.forEach(userObj => {
              userObj["key"] = userObj.id;
            });
            dispatch({
              type: "USER_DETAILS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  getPosts: payload => {
    return dispatch => {
      return api({
        url: `/posts?userId=${payload.id}&skip=${payload.skip}&limit=${payload.limit}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "POSTS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  getPostDetails: payload => {
    return dispatch => {
      return api({
        url: `/posts/${payload.id}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "POST_DETAILS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  getComments: payload => {
    return dispatch => {
      return api({
        url: `/comments?postId=${payload.id}`,
        method: "GET"
      })
        .then(resp => {
          if (resp) {
            dispatch({
              type: "COMMENTS",
              payload: resp
            });
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  },
  deletePost: payload => {
    return dispatch => {
      return api({
        url: `/posts/${payload.id}`,
        method: "DELETE"
      })
        .then(resp => {
          if (resp) {
            return resp;
          }
        })
        .catch(err => {
          return err;
        });
    };
  }
};

export default userAction;
