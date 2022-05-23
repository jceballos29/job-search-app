import "../assets/styles/app.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import jobService from "../api/jobs";
import CourseCard from "../components/CourseCard";
import { authContext } from "../context/AuthContext";

import jobImage from "../assets/images/undraw_feeling_proud_qne1.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const context = useContext(authContext);

  const [jobs, setJobs] = useState(null);

  const fetchJobs = useCallback(async () => {
    const response = await jobService.fetchAllJobs();
    if (response.status === 200) {
      setJobs(response.data);
    }
  }, [setJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="home  pt-5">
      <section className="home__hero py-5 text-light border-bottom border-5 border-primary">
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
              <Button
                as={Link}
                to="/ofertas"
                variant="primary"
                size="lg"
                className="home__hero__button text-light rounded-pill"
              >
                Ver todas las ofertas
              </Button>
            </Col>
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
              {!!jobs && jobs.length > 0 && (
                <p className="text-center">
                  {
                    jobs.filter(
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
            {!!jobs ? (
              jobs.length > 0 ? (
                jobs
                  .filter(
                    (job) =>
                      new Date(job.creationDate) >
                      new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.creationDate) - new Date(a.creationDate)
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
                  as={Link}
                  to="/dashboard"
                  variant="outline-light"
                  className="rounded-pill"
                  size="lg"
                >
                  Agrega tu oferta
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/ofertas"
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
