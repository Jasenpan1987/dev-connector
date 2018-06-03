import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount
} from "../../actions/profile-actions";
import { Spiner } from "../common/Spinner";
import { ProfileActions } from "./ProfileActions";

class DashboardComponent extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spiner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: 60 }} />
            <button className="btn btn-danger" onClick={this.handleClick}>
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashBoardContent = (
          <div>
            <p>
              You don't have any profile yet.{" "}
              <Link to="/create-profile">Add a profile</Link>
            </p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

DashboardComponent.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

export const Dashboard = connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(DashboardComponent);
