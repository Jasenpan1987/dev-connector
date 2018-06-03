import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  state = {
    clientId: "437afe707541f3574ec8",
    clientSecret: "d5a3020e9bd12002bb18bd80780f6585fbb42005",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(response => response.json())
      .then(data => {
        if (this.refs.profilegithub) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderRepos = () => {
    const { repos } = this.state;
    return repos.map(repo => {
      return (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success mr-1">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div ref="profilegithub">
        <hr />
        <h3 className="mb-4">Latest Repos</h3>
        {this.renderRepos()}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export { ProfileGithub };
