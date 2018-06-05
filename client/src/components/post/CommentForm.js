import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { addComment } from "../../actions/post-actions";

export default class CommentFormComponent extends Component {
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
    const { postId } = this.props;
    const { user } = this.props.auth;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({
      text: ""
    });
  };

  render() {
    const { errors, text } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Write a comment</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <TextAreaFieldGroup
                placeholder="Write something..."
                name="text"
                value={text}
                onChange={this.handleChange}
                error={errors.post}
              />
              <button type="submit" className="btn btn-dark">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentFormComponent.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export const CommentForm = connect(
  mapStateToProps,
  { addComment }
)(CommentFormComponent);
