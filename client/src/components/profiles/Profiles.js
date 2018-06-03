import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spiner } from "../common/Spinner";
import { getProfiles } from "../../actions/profile-actions";
import { ProfileItem } from "./ProfileItem";

class ProfilesComponent extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  renderProfileItem = () => {
    const { profiles, loading } = this.props;

    if (profiles === null || loading) {
      return <Spiner />;
    } else if (profiles.length === 0) {
      return <h4>No Profiles Found</h4>;
    } else {
      return profiles.map(profile => (
        <ProfileItem profile={profile} key={profile._id} />
      ));
    }
  };
  render() {
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with other developers
              </p>
              {this.renderProfileItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles
});

ProfilesComponent.propTypes = {
  profiles: PropTypes.array,
  getProfiles: PropTypes.func.isRequired
};

export const Profiles = connect(mapStateToProps, { getProfiles })(
  ProfilesComponent
);
