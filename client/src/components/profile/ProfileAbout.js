import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class ProfileAbout extends Component {
  getFirstName = name => {
    return name.trim().split(" ")[0];
  };

  renderSkills = () => {
    const { skills } = this.props.profile;
    return skills.map((skill, idx) => (
      <div className="p-3" key={idx}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {this.getFirstName(profile.user.name)}'s Bio
            </h3>
            {_.isEmpty(profile.bio) ? (
              <span>
                {this.getFirstName(profile.user.name)} does not have a bio
              </span>
            ) : (
              <p className="lead">{profile.bio}</p>
            )}
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {this.renderSkills()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export { ProfileAbout };
