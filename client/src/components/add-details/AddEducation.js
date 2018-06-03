import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profile-actions";

export default class AddEducationComponent extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const education = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    // console.log(education);
    this.props.addEducation(education, this.props.history);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Any school, bootcamp ect that you attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleFieldChange("school")}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="* Degree/Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleFieldChange("degree")}
                  error={errors.degree}
                />

                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleFieldChange("fieldofstudy")}
                  error={errors.fieldofstudy}
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
                    Current Education?
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleFieldChange("description")}
                  error={errors.description}
                  info="Tell us more about this program"
                />

                <input
                  type="submit"
                  value="Save"
                  className="btn btn-block btn-success mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducationComponent.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export const AddEducation = connect(mapStateToProps, { addEducation })(
  withRouter(AddEducationComponent)
);
