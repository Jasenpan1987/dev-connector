import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile-actions";

class ExperienceComponent extends Component {
  handleDeleteExperience = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience
      .sort((a, b) => {
        if (a.from > b.from) return -1;
        if (a.from < b.from) return 1;
        return 0;
      })
      .map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
            {exp.to ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : "Now"}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.handleDeleteExperience.bind(this, exp._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    return (
      <div>
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>From - To</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

ExperienceComponent.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

export const Experience = connect(null, { deleteExperience })(
  ExperienceComponent
);
