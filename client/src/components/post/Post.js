import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/post-actions";
import { Link } from "react-router-dom";
import { PostItem } from "../posts/PostItem";
import { Spiner } from "../common/Spinner";
import { CommentForm } from "./CommentForm";
import { CommentFeed } from "./CommentFeed";

export default class PostComponent extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
  }

  renderPostContent = () => {
    const { post, loading } = this.props.post;

    if (post === null || loading || Object.keys(post).length === 0) {
      return <Spiner />;
    }

    return (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  };
  render() {
    const { post, loading } = this.props;

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {this.renderPostContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

PostComponent.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export const Post = connect(
  mapStateToProps,
  { getPost }
)(PostComponent);
