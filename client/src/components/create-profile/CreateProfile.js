import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";
import { SelectListGroup } from "../common/SelectListGroup";
import { InputGroup } from "../common/InputGroup";
import { createProfile } from "../../actions/profile-actions";

const statusOptions = [
  { label: "* Select professional status", value: 0 },
  { label: "Developer", value: "Developer" },
  { label: "Junior Developer", value: "Junior Developer" },
  { label: "Mid-Level Developer", value: "Mid-Level Developer" },
  { label: "Senior Developer", value: "Senior Developer" },
  { label: "Manager", value: "Manager" },
  { label: "Student or Learning", value: "Student or Learning" },
  { label: "Instructor or Teacher", value: "Instructor or Teacher" },
  { label: "Intern", value: "Intern" },
  { label: "Others", value: "Others" }
];

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

    if (nextProps.auth && nextProps.auth.isAuthenticated) {
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

  handleSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  renderSocialInputs = () => {
    const {
      errors,
      displaySocialInputs,
      facebook,
      twitter,
      youtube,
      linkedin,
      instagram
    } = this.state;

    if (!displaySocialInputs) {
      return null;
    }

    return (
      <div>
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={this.handleFieldChange("facebook")}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={this.handleFieldChange("twitter")}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={this.handleFieldChange("linkedin")}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder="YouTube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={this.handleFieldChange("youtube")}
          error={errors.youtube}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={this.handleFieldChange("instagram")}
          error={errors.instagram}
        />
      </div>
    );
  };

  render() {
    const { errors } = this.state;
    console.log(this.props);
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
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleFieldChange("handle")}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your Full Name, Company Name, Nick Name."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleFieldChange("status")}
                  error={errors.status}
                  options={statusOptions}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleFieldChange("company")}
                  error={errors.company}
                  info="Could be your own company or the one you are working for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleFieldChange("website")}
                  error={errors.website}
                  info="Please let us know your website, could be your company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleFieldChange("location")}
                  error={errors.location}
                  info="City or city & state suggested (eg. Sydney, NSW)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleFieldChange("skills")}
                  error={errors.skills}
                  info="Please use comma separated values (eg. html,css,javascript...)"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleFieldChange("bio")}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {this.renderSocialInputs()}
                <input
                  className="btn btn-block btn-info mt-4"
                  type="submit"
                  value="Save"
                />
              </form>
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
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

export const CreateProfile = connect(mapStateToProps, { createProfile })(
  // withRouter(CreateProfileComponent)
  CreateProfileComponent
);
