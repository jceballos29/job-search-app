import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { AiOutlineDollar, AiOutlineEnvironment } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import jobs from "../../api/jobs";
import { authContext } from "../../context/AuthContext";

const JobDetail = () => {
  const context = useContext(authContext);

  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const fetchJob = useCallback(async () => {
    const response = await jobs.fetchJob(jobId);
    if (response.status === 200) {
      if (response.data) {
        setJob(response.data);
      } else {
        setJob("not found");
      }
    }
  }, [jobId]);

  const handleUnapplyForJob = async (jobId) => {
    const response = await jobs.unapplyForJob(jobId);
    if (response.status === 200) {
      context.setAuth({
        ...context.auth,
        applications: context.auth.applications.filter(
          (job) => job._id !== jobId
        ),
      });
      toast.success("Se ha cancelado la solicitud");
    } else {
      toast.error("Ha ocurrido un error");
    }
  };

  const handleApplyForJob = async (jobId) => {
    const response = await jobs.applyForJob(jobId);
    if (response.status === 200) {
      context.setAuth({
        ...context.auth,
        applications: [...context.auth.applications, response.data],
      });
      toast.success("Se ha aplicado a la oferta");
    } else {
      toast.error("Ha ocurrido un error");
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId, fetchJob]);

  return (
    <div className="detail page pt-5">
      <header className="py-5 border-bottom border-5 border-primary text-light">
        <Container className="my-5">
          <Row>
            <Col>
              <h1>Detalle de la oferta</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <section className="detail__content py-5">
        <Container>
          {job ? (
            <Row>
              {job === "not found" ? (
                <Col>
                  <h2>Oferta no encontrada</h2>
                </Col>
              ) : (
                <>
                  <Col sm={12} lg={8}>
                    <h2 className="text-primary">{job.title}</h2>
                    <hr />
                    <div className="mb-3">
                      <span className="text-muted fw-bold d-block mb-2">
                        Descripción
                      </span>
                      <p>{job.description}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-muted fw-bold d-block mb-2">
                        Categorías
                      </span>
                      {job.category.map((category, index) => (
                        <h4 key={index} className="d-inline-block">
                          <Badge className="me-2 text-capitalize">
                            {category}
                          </Badge>
                        </h4>
                      ))}
                    </div>
                    <div className="mb-3">
                      <span className="text-muted fw-bold d-block mb-2">
                        Ubicación
                      </span>
                      <p className="d-flex align-items-center">
                        <AiOutlineEnvironment
                          className="text-primary"
                          style={{ fontSize: 24 }}
                        />
                        &nbsp;
                        {job.location.city}, {job.location.province},{" "}
                        {job.location.country}
                      </p>
                    </div>
                    <div className="mb-3">
                      <span className="text-muted fw-bold d-block mb-2">
                        Salario
                      </span>
                      <p className="d-flex align-items-center">
                        <AiOutlineDollar
                          className="text-primary"
                          style={{ fontSize: 24 }}
                        />
                        &nbsp;
                        {job.salary}&nbsp;<span className="fw-bold">USD</span>
                      </p>
                    </div>
                  </Col>
                  <Col sm={12} lg={4}>
                    {context.auth.user.role === "applicant" ? (
                      <Row className="mb-3">
                        <Col>
                          {!context.auth.applications
                            .map((job) => job._id)
                            .includes(jobId) ? (
                            <Button
                              className="w-100 text-light"
                              size="lg"
                              onClick={() => {
                                handleApplyForJob(job._id);
                              }}
                            >
                              Aplicar a estar oferta
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              className="w-100"
                              size="lg"
                              onClick={() => {
                                handleUnapplyForJob(job._id);
                              }}
                            >
                              Eliminar aplicación
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ) : null}
                    <Row>
                      <Col>
                        <Card className="border-0 shadow-sm border-top border-5 border-primary">
                          <Card.Body>
                            <Card.Title>Ofertante</Card.Title>
                            <span className="text-muted fw-bold d-block">
                              Nombre
                            </span>
                            <Card.Text>{job.employer.name}</Card.Text>
                            <span className="text-muted fw-bold d-block">
                              Correo electrónico
                            </span>
                            <Card.Text>{job.employer.email}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </>
              )}
            </Row>
          ) : (
            <Row>
              <Col>
                <Spinner animation="border" variant="primary" />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default JobDetail;
