import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile-actions";
import { Spiner } from "../common/Spinner";

class DashboardComponent extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spiner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = <h3>DISPLAY PROFILE</h3>;
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You don't have any profile yet.{" "}
              <Link to="/create-profile">Add a profile</Link>
            </p>
          </div>
        );
      }
    }
    console.log("loading:: ", this.props.auth);
    console.log("profile:: ", this.props.profile);
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
  profile: PropTypes.object.isRequired
};

export const Dashboard = connect(mapStateToProps, { getCurrentProfile })(
  DashboardComponent
);
