import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/set-auth-token";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
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
    window.location.href = "/login";
  }
}

const Dashboard = () => <h3>Dashboard</h3>;

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
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
