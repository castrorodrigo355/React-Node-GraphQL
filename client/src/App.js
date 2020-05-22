import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navbar";
import Home from "./components/Home";
import DeveloperForm from "./components/developerForm";
import DeveloperList from "./components/developerList";
import DeveloperDetail from "./components/developerDetail";
import DeveloperEdit from "./components/developerEdit";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Switch>
          <Route
            exact
            path="/developerList/edit/:_id"
            component={DeveloperEdit}
          />
          <Route exact path="/developerList/:_id" component={DeveloperDetail} />
          <Route exact path="/developerList" component={DeveloperList} />
          <Route exact path="/developerForm" component={DeveloperForm} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
