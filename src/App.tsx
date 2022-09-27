import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./components/Jobs";
import JobItemDetails from "./components/JobItemDetails";
import NotFound from "./components/NotFound";
import Home from "./components/Home";

import Login from "./components/Login";
import { observer } from "mobx-react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default observer(App);
