import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { useToken } from './components/useToken';
import { Cities } from "./components/Cities";
import { Clients } from "./components/Clients";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Navbar />
      <div className="container pt-5">
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/clients" component={Clients} />
          <Route path="/cities" component={Cities} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
