import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Users from "./Components/Users";
import Posts from "./Components/Posts";
import PostDetails from "./Components/PostDetails";

function App() {
  return (
    <div className="App">
      <div className="header">ASSIGNMENT</div>
      <div className="mainContainer">
        <Switch>
          <Route exact path="/" component={Users} />
          <Route path="/userPosts/:id?" component={Posts} />
          <Route path="/postDetails/:id?" component={PostDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
