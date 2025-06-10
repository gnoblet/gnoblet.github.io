import React from "react";
import { featuresList } from "../../data/features";
import "../../styles/common/CardList.css";

const FeaturesList: React.FC = () => {
  return (
    <div className="card-list-container">
      <ul className="card-list">
        {featuresList.map((feature, index) => (
          <li key={index} className="card-item">
            <div className="card-link">
              <p className="card-content">
                <span className="feature-title">{feature.title}</span>
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesList;