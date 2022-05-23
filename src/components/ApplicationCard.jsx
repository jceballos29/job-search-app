
import { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiOutlineDollar, AiOutlineEnvironment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jobs from "../api/jobs";
import { authContext } from "../context/AuthContext";

const ApplicationCard = ({ application }) => {
  const context = useContext(authContext);

  const handleUnapplyForJob = async (jobId) => {
    const response = await jobs.unapplyForJob(jobId);
    if (response.status === 200) {
      context.setAuth({
        ...context.auth,
        applications: context.auth.applications.filter(
          (job) => job._id !== jobId
        ),
      });
      toast.success("Has cancelado tu solicitud");
    } else {
      toast.error("Ha ocurrido un error");
    }
  };

  return (
    <Card className="border-0 shadow-sw mb-2">
      <Card.Body>
        <Row>
          <Col
            sm={12}
            lg={10}
            className="job_card__content d-flex flex-column flex-lg-row align-items-center justify-content-start"
          >
            <Card.Title className="text-primary text-center text-lg-start mb-0 me-4 w-50">
              <Link to={`/ofertas/${application._id}`}>
                {" "}
                {application.title}
              </Link>
            </Card.Title>
            <div className="job_card__information mt-3 mt-lg-0 d-flex w-50">
              <div className="job_card__salary d-flex align-items-center me-3">
                <AiOutlineDollar
                  className="text-primary"
                  style={{ fontSize: 24 }}
                />
                &nbsp;
                <span className="text-secondary">
                  {application.salary / 1000}K
                </span>
              </div>
              <div className="job__country d-flex align-items-center me-3">
                <AiOutlineEnvironment
                  className="text-primary"
                  style={{ fontSize: 24 }}
                />
                &nbsp;
                <span className="text-secondary">
                  {application.location.country}
                </span>
              </div>
            </div>
          </Col>
          <Col
            sm={12}
            lg={2}
            className="job_card__buttons mt-3 mt-lg-0 d-flex align-items-center justify-content-center justify-content-lg-end "
          >
            <Button
              variant="danger"
              onClick={() => {
                handleUnapplyForJob(application._id);
              }}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ApplicationCard;
