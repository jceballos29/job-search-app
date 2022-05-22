import "../assets/styles/app.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import jobs from "../api/jobs";
import CourseCard from "../components/CourseCard";
import { authContext } from "../context/AuthContext";

import jobImage from "../assets/images/undraw_feeling_proud_qne1.svg";

const Home = () => {
  const context = useContext(authContext);

  const [jobList, setJobList] = useState(null);

  const fetchJobs = useCallback(async () => {
    const response = await jobs.fetchAllJobs();
    if (response.status === 200) {
      setJobList(response.data);
    }
  }, [setJobList]);

  const fetchApplications = useCallback(async () => {
    const result = await jobs.fetchApplications();
    if (result.status === 200) {
      if (result.data.error) {
        context.setAuth({
          ...context.auth,
          applications: [],
        });
      } else {
        context.setAuth({
          ...context.auth,
          applications: result.data,
        });
      }
    }
  }, [context]);

  const fetchOffers = useCallback(async () => {
    const result = await jobs.fetchOffers();
    if (result.status === 200) {
      if (result.data.error) {
        context.setAuth({
          ...context.auth,
          offers: [],
        });
      } else {
        context.setAuth({
          ...context.auth,
          offers: result.data,
        });
      }
    }
  }, [context]);

  useEffect(() => {
    if (context.auth.isAuthenticated) {
      fetchJobs();
      if (context.auth.user.role === "applicant") {
        fetchApplications();
      }
      if (context.auth.user.role === "employer") {
        fetchOffers();
      }
    }
  }, [context, fetchApplications, fetchJobs, fetchOffers]);

  return (
    <div className="home  pt-5">
      <section className="home__hero py-5 text-light">
        <Container>
          <Row className="justify-content-start mt-5">
            <Col sm={10} md={8}>
              <h1
                className="home__hero__title text-uppercase fw-bold"
                style={{ fontSize: "4rem" }}
              >
                JOB <span className="text-primary">SEARCH</span>
              </h1>
              <p className="home__hero__paragraph mb-4">
                Si no encuentras un trabajo que te guste o desear conformar un
                excelente equipo te trabajo, no te preocupes, aquí encontrarás
                todos los trabajos y profesionales que necesitas.
              </p>
            </Col>
          </Row>
          <Row className="mt-5 py-5">
            <Form>
              <Row>
                <Col sm={12} md={3} className="mb-2">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Categoría"
                      className="home__hero__form"
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={3} className="mb-2">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="País"
                      className="home__hero__form"
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={3} className="mb-2">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Provincia"
                      className="home__hero__form"
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={3} className="mb-2">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Ciudad"
                      className="home__hero__form"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group>
                    <Button type="submit" size="lg" className="text-light">
                      Buscar Empleo
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Row>
        </Container>
      </section>
      <section className="home__recent py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="text-center">
                Ofertas <span className="text-primary">recientes</span>
              </h2>
              {!!jobList && jobList.length > 0 && (
                <p className="text-center">
                  {
                    jobList.filter(
                      (job) =>
                        new Date(job.creationDate) >
                        new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
                    ).length
                  }{" "}
                  nuevas ofertas
                </p>
              )}
            </Col>
          </Row>
          <Row>
            {!!jobList ? (
              jobList.length > 0 ? (
                jobList
                  .filter(
                    (job) =>
                      new Date(job.creationDate) >
                      new Date(Date.now() - 1000 * 60 * 60 * 24 * 15)
                  )
                  .slice(0, 8)
                  .map((job) => (
                    <Col sm={12} md={6} xl={3} key={job._id}>
                      <CourseCard job={job} />
                    </Col>
                  ))
              ) : (
                <p>No hay ofertas disponibles</p>
              )
            ) : (
              <Col className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <section className="home__jobs py-5 bg-primary">
        <Container>
          <Row>
            <Col
              sm={12}
              md={6}
              className="d-flex flex-column align-items-start justify-content-center"
            >
              {context.auth.user.role === "employer" ? (
                <>
                  <h2
                    className="text-light mb-4"
                    style={{ fontSize: "3.5rem" }}
                  >
                    ¿Formando tu equipo?
                  </h2>
                  <h4
                    className="text-white-50 mb-4"
                    style={{ fontSize: "2rem" }}
                  >
                    Aquí encontrarás los mejores profesionales para hacerlo.
                  </h4>
                </>
              ) : (
                <>
                  <h2
                    className="text-light mb-4"
                    style={{ fontSize: "3.5rem" }}
                  >
                    ¿Buscas un empleo?
                  </h2>
                  <h4
                    className="text-white-50 mb-4"
                    style={{ fontSize: "2rem" }}
                  >
                    Aquí encontrarás las mejores ofertas de trabajo.
                  </h4>
                </>
              )}
              {context.auth.user.role === "employer" ? (
                <Button
                  variant="outline-light"
                  className="rounded-pill"
                  size="lg"
                >
                  Agrega tu oferta
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  className="rounded-pill"
                  size="lg"
                >
                  Ver todos las ofertas
                </Button>
              )}
            </Col>
            <Col
              sm={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <Image src={jobImage} fluid style={{ maxHeight: 350 }} />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
