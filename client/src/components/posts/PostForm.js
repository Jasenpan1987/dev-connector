import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { addPost } from "../../actions/post-actions";

export default class PostFormComponent extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
      errors: {}
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({
      text: ""
    });
  };

  render() {
    const { errors, text } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={this.handleChange}
                error={errors.post}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostFormComponent.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export const PostForm = connect(
  mapStateToProps,
  { addPost }
)(PostFormComponent);
