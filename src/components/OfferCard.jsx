import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import {
  AiOutlineDollar,
  AiOutlineEnvironment,
  AiOutlineUser,
} from "react-icons/ai";

const OfferCard = ({ job }) => {
  return (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col>
            <Card.Text as="h4" className="text-primary">
              {job.title}
            </Card.Text>

            <Card.Text>{job.description}</Card.Text>
            {job.category.map((category, index) => (
              <Badge key={index} className=" text-light text-capitalize me-1">
                {category}
              </Badge>
            ))}
            <Row className="mt-3">
              <Col sm={12} md={6} lg={4}>
                <Card.Text className="d-flex align-items-center mb-0">
                  <AiOutlineEnvironment
                    className="text-primary"
                    style={{ fontSize: 24 }}
                  />
                  &nbsp;
                  {job.location.city},{" "}
                  {job.location.country}
                </Card.Text>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card.Text className="d-flex align-items-center mb-0">
                  <AiOutlineDollar
                    className="text-primary"
                    style={{ fontSize: 24 }}
                  />
                  &nbsp;
                  {job.salary}&nbsp;
                  <span className="fw-bold">USD</span>
                </Card.Text>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card.Text className="d-flex align-items-center mb-0">
                  <AiOutlineUser
                    className="text-primary"
                    style={{ fontSize: 24 }}
                  />
                  &nbsp;
                  {job.applicants.length} Solicitantes
                </Card.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OfferCard;
