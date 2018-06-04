import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { setAuthToken } from "./utils/set-auth-token";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import { clearProfile } from "./actions/profile-actions";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Landing } from "./components/layout/Landing";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CreateProfile } from "./components/create-profile/CreateProfile";
import { EditProfile } from "./components/edit-profile/EditProfile";
import { AddExperience } from "./components/add-details/AddExperience";
import { AddEducation } from "./components/add-details/AddEducation";
import { Profiles } from "./components/profiles/Profiles";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { NotFound } from "./components/not-found/NotFound";
import { Posts } from "./components/posts/Posts";
import "./App.css";

const token = localStorage.getItem("jwtToken");

if (token) {
  setAuthToken(token);
  const userDecoded = jwt_decode(token);
  store.dispatch(setCurrentUser(userDecoded));

  // logout user if the token expires
  const currentTime = Date.now() / 1000;
  if (userDecoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/notfound" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
