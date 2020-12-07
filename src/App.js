import React from "react";
import ChirpList from "./components/ChirpList";
import ChirpForm from './components/ChirpForm';
import ChirpContextProvider from "./contexts/ChirpContext";
import AuthProvider from "./contexts/AuthContext"
import Navbar from "./components/NavBar";
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App main container-lg">
      <AuthProvider>
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
              <Route exact path="/SignIn">
                <SignIn />
              </Route>
              <Route exact path="/SignUp">
                <SignUp />
              </Route>
            </Switch>
          </Router>
        </ChirpContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
