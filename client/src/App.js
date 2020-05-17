import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navbar";
import Home from "./components/Home";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import MessageDetail from "./components/MessageDetail";
import MessageEdit from "./components/MessageEdit";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Switch>
          <Route exact path="/messageList/edit/:_id" component={MessageEdit} />
          <Route exact path="/messageList/:_id" component={MessageDetail} />
          <Route exact path="/messageList" component={MessageList} />
          <Route exact path="/create-message" component={MessageForm} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
