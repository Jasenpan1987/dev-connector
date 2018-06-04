import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth-actions";
import { clearProfile } from "../../actions/profile-actions";

class NavbarComponent extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            style={{ cursor: "pointer" }}
            className="nav-link"
            to="/login"
            onClick={this.handleLogout}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 30, marginRight: 5 }}
              className="rounded-circle"
            />{" "}
            <span>Logout</span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/profiles" className="nav-link">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

NavbarComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export const Navbar = connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(NavbarComponent);
