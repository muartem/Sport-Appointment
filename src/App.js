import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Services from "./components/Services/Services";
import Clients from "./components/Clients/Clients";
import Coaches from "./components/Coaches/Coaches";
import Slots from "./components/Slots/Slots";
import Booking from "./components/Booking/Booking";
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
