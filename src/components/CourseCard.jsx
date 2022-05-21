import React from "react";
import { Card } from "react-bootstrap";

import {
  AiOutlineDollar,
  AiOutlineEnvironment,
  AiOutlineUser,
} from "react-icons/ai";

const CourseCard = ({ job }) => {
  return (
    <Card className="border-0 shadow-sm mb-3 py-3" style={{minHeight: 350}}>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <div
          className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 120, height: 120, fontSize: "4rem" }}
        >
          <span className="fw-bold text-light">J</span>
        </div>
        <Card.Title className="text-center mt-3">{job.title}</Card.Title>
        <Card.Text className="text-center text-muted text-capitalize">
          {job.category.map((category, index) => (
            <span className="text-center text-muted" key={index}>-&nbsp;{category}&nbsp;</span>
          ))}
          -
        </Card.Text>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <div className="job__salary d-flex align-items-center">
            <AiOutlineDollar
              className="text-primary"
              style={{ fontSize: 24 }}
            />
            &nbsp;<span className="text-secondary">{job.salary / 1000}K</span>
          </div>
          <div className="job__country d-flex align-items-center">
            <AiOutlineEnvironment
              className="text-primary"
              style={{ fontSize: 24 }}
            />
            &nbsp;<span className="text-secondary">{job.location.country}</span>
          </div>
          <div className="job__applicants d-flex align-items-center">
            <AiOutlineUser
              className="text-primary"
              style={{ fontSize: 24 }}
            />
            &nbsp;<span className="text-secondary">{job.applicants.length}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
