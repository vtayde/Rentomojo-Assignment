import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Users from "./Components/Users";
import Posts from "./Components/Posts";
import PostDetails from "./Components/PostDetails";
import ErrorBoundary from "./ErrorBoundary";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <div className="App">
      <div className="header">ASSIGNMENT</div>
      <div className="mainContainer">
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ErrorBoundary>
                <Users />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/userPosts/:id?"
            component={() => (
              <ErrorBoundary>
                <Posts />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/postDetails/:id?"
            component={() => (
              <ErrorBoundary>
                <PostDetails />
              </ErrorBoundary>
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
