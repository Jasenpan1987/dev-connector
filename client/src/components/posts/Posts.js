import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PostForm } from "./PostForm";
import { Spiner } from "../common/Spinner";
import { getPosts } from "../../actions/post-actions";
import { PostFeed } from "./PostFeed";

class PostsComponent extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  renderPostsFeed = () => {
    const { loading, posts } = this.props.post;
    if (posts === null || loading) {
      return <Spiner />;
    }
    return <PostFeed posts={posts} />;
  };

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {this.renderPostsFeed()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostsComponent.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export const Posts = connect(
  mapStateToProps,
  { getPosts }
)(PostsComponent);
