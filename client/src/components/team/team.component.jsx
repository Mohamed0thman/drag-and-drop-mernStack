import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTie,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import "./team.styles.scss";

const Team = ({ team }) => {
  const { teamName, admin, normal, teamLeader, teamType } = team;
  console.log(team);
  return (
    <div className="team">
      <div className="team__image">
        <img src="/image/business-relation.jpg" alt="" />
      </div>

      <div className="team__info">
        <h3 className="team__title">{teamName}</h3>
        <ul className="team__list">
          <li className="team__item">
            <div className="team__left">
              <FontAwesomeIcon className="team__icon" icon={faUserTie} />
              <span>Leader</span>
            </div>
            <div className="team__right"> {teamLeader}</div>
          </li>
          <li className="team__item">
            <div className="team__left">
              <FontAwesomeIcon className="team__icon" icon={faUsers} />
              <span>Members</span>
            </div>
            <div className="team__right">{admin.length + normal.length} </div>
          </li>
          <li className="team__item">
            <div className="team__left">
              <FontAwesomeIcon
                className="team__icon"
                icon={teamType === "education" ? faGraduationCap : faBriefcase}
              />
              <span>Type</span>
            </div>
            <div className="team__right"> {teamType}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Team;
