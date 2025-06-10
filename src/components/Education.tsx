import React from "react";
import type { Education } from "../types/education";
import { educationList } from "../data/education";
import "../styles/common/CardListWhite.css";

const EducationItem: React.FC<{ education: Education }> = ({ education }) => {
  const { degree, institution, thesis, years } = education;

  return (
    <li className="card-item-white">
      <div className="degree-title">🎓 {degree}</div>
      <div className="institution">🏫 {institution}</div>
      {thesis && <div className="thesis">📝 Thesis: {thesis}</div>}
      <div className="years">⌛ {years}</div>
    </li>
  );
};

const Education: React.FC = () => {
  return (
    <div className="card-list-white-container">
      <ul className="card-list-white">
        {educationList.map((education, index) => (
          <EducationItem key={index} education={education} />
        ))}
      </ul>
    </div>
  );
};

export default Education;
