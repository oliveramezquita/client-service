import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pt-5">
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
