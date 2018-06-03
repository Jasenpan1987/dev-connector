import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile-actions";

class EducationComponent extends Component {
  handleDeleteEducation = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education
      .sort((a, b) => {
        if (a.from > b.from) return -1;
        if (a.from < b.from) return 1;
        return 0;
      })
      .map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
            {edu.to ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : "Now"}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.handleDeleteEducation.bind(this, edu._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>From - To</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

EducationComponent.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

export const Education = connect(null, { deleteEducation })(EducationComponent);
