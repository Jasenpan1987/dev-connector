import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";
import { addExperience } from "../../actions/profile-actions";

export default class AddExperienceComponent extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
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

    const experience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(experience, this.props.history);
  };

  handleToggleIsCurrent = () => {
    this.setState(prevState => {
      if (!prevState.current) {
        return {
          to: "",
          current: true
        };
      }
      return {
        current: false
      };
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Any job or position, either past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleFieldChange("company")}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleFieldChange("title")}
                  error={errors.title}
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleFieldChange("location")}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="From"
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.handleFieldChange("from")}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To"
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleFieldChange("to")}
                  error={errors.to}
                  disabled={this.state.current ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleToggleIsCurrent}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job?
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleFieldChange("description")}
                  error={errors.description}
                  info="Tell us more about this position"
                />

                <input
                  type="submit"
                  value="Save"
                  className="btn btn-block btn-info mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperienceComponent.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export const AddExperience = connect(mapStateToProps, { addExperience })(
  withRouter(AddExperienceComponent)
);
