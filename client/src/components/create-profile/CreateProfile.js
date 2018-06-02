import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextFieldGroup } from "../common/TextFieldGroup";

class CreateProfileComponent extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("dashboard");
    }
  }

  handleFieldChange = fieldName => e => {
    const newErrors = { ...this.state.errors };
    delete newErrors[fieldName];

    this.setState({
      [fieldName]: e.target.value,
      errors: newErrors
    });
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some infomation to get your profile to standout
              </p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

CreateProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export const CreateProfile = connect(mapStateToProps)(CreateProfileComponent);
