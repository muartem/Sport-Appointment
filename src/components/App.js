import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav/Nav";
import Services from "./Services/Services";
import Clients from "./Clients/Clients";
import Coaches from "./Coaches/Coaches";
import Slots from "./Slots/Slots";
import Booking from "./Booking/Booking";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Services} />
          <Route path="/coaches" component={Coaches} />
          <Route path="/clients" component={Clients} />
          <Route path="/slots" component={Slots} />
          <Route path="/booking" component={Booking} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
