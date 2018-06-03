import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import _ from "lodash";

class ProfileDetails extends Component {
  renderExperience = () => {
    const { experience } = this.props;
    return experience
      .sort((a, b) => {
        if (a.from > b.from) return -1;
        if (a.from < b.from) return 1;
        return 0;
      })
      .map(exp => (
        <li key={exp._id} className="list-group-item mt-2 bg-light">
          <h4>{exp.company}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
            {exp.current ? (
              "Now"
            ) : (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position: </strong>
            {exp.title}
          </p>
          {exp.location ? (
            <p>
              <strong>Location: </strong>
              {exp.title}
            </p>
          ) : null}
          {exp.description ? (
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          ) : null}
        </li>
      ));
  };

  renderEducation = () => {
    const { education } = this.props;
    return education
      .sort((a, b) => {
        if (a.from > b.from) return -1;
        if (a.from < b.from) return 1;
        return 0;
      })
      .map(edu => (
        <li key={edu._id} className="list-group-item mt-2 bg-light">
          <h4>{edu.school}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
            {edu.current ? (
              "Now"
            ) : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field of study: </strong>
            {edu.fieldofstudy}
          </p>
          {edu.description ? (
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          ) : null}
        </li>
      ));
  };

  render() {
    const { experience, education } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experience.length > 0 ? (
            <ul className="list-group">{this.renderExperience()}</ul>
          ) : (
            <h4 className="text-muted text-center">No Experience specified</h4>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {education.length > 0 ? (
            <ul className="list-group">{this.renderEducation()}</ul>
          ) : (
            <h4 className="text-muted text-center">No Education specified</h4>
          )}
        </div>
      </div>
    );
  }
}

ProfileDetails.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export { ProfileDetails };
