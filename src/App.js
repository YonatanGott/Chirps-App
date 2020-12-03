import React from "react";
import ChirpList from "./components/ChirpList";
import ChirpForm from './components/ChirpForm';
import ChirpContextProvider from "./contexts/ChirpContext";
import Navbar from "./components/NavBar";
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App main container-lg">
      <ChirpContextProvider>
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/">
              <ChirpForm />
              <ChirpList />
            </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </ChirpContextProvider>
    </div>
  );
}

export default App;
