import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../../actions/auth-actions";
import { TextFieldGroup } from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

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
    const { name, email, password, repassword } = this.state;
    const newUser = {
      name,
      email,
      password,
      repassword
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit} noValidate>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleFieldChange("name")}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFieldChange("email")}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFieldChange("password")}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="repassword"
                  value={this.state.repassword}
                  onChange={this.handleFieldChange("repassword")}
                  error={errors.repassword}
                />
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-info btn-block mt-4"
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
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch)
});

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Register)
);
