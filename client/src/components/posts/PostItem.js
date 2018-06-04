import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/post-actions";

class PostItemComponent extends Component {
  handleDeletePost = postId => {
    this.props.deletePost(postId);
  };

  handleLikePost = postId => {
    this.props.addLike(postId);
  };

  handleUnlikePost = postId => {
    this.props.removeLike(postId);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  };
  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              type="button"
              className="btn btn-light mr-1"
              onClick={this.handleLikePost.bind(this, post._id)}
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": this.findUserLike(post.likes)
                })}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              type="button"
              className="btn btn-light mr-1"
              onClick={this.handleUnlikePost.bind(this, post._id)}
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id && (
              <button
                onClick={this.handleDeletePost.bind(this, post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItemComponent.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export const PostItem = connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItemComponent);
