import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import jobService from "../../api/jobs";
import CourseCard from "../../components/CourseCard";
import { authContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

const Jobs = () => {
  const context = useContext(authContext);

  const [jobs, setJobs] = useState(null);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = async (data) => {
    setJobs(null);
    console.log(data.category);
    if (!!!(data.category || data.country || data.province || data.city)) {
      setFilter("all");
      const response = await jobService.fetchAllJobs();
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    }
    if (data.category) {
      setFilter("Categoría");
      setCategory(data.category);
      const response = await jobService.fetchJobsByCategory(data.category);
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    }
    if (data.country || data.province || data.city) {
      setFilter("Ubicación");
      setLocation([
        data.country,
        data.province ? data.province : null,
        data.city ? data.city : null,
      ]);
      const location = {
        country: data.country,
        province: data.province,
        city: data.city,
      };
      const response = await jobService.fetchJobsByLocation(location);
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    }
  };

  const fetchAllJobs = useCallback(async () => {
    const response = await jobService.fetchAllJobs();
    if (response.status === 200) {
      setJobs(response.data);
    } else {
      setJobs([]);
    }
  }, [setJobs]);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  return (
    <div className="jobs page pt-5">
      <header className="py-5 border-bottom border-5 border-primary text-light">
        <Container className="my-5">
          <Row>
            <Col>
              <h1>Ofertas</h1>
            </Col>
          </Row>
        </Container>
      </header>
      {context.auth.user.role === "applicant" && (
        <>
          <section className="jobs__search py-5">
            <Container>
              <Row>
                <Col>
                  <h2>Filtrar ofertas</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                          <Col sm={12} md={3} className="mb-2">
                            <Form.Group>
                              <Form.Control
                                disabled={
                                  watch("country") ||
                                  watch("province") ||
                                  watch("city")
                                }
                                type="text"
                                placeholder="Categoría"
                                className="home__hero__form"
                                {...register("category", {})}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={3} className="mb-2">
                            <Form.Group>
                              <Form.Control
                                disabled={watch("category")}
                                type="text"
                                placeholder="País"
                                className="home__hero__form"
                                {...register("country", {})}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={3} className="mb-2">
                            <Form.Group>
                              <Form.Control
                                disabled={watch("category")}
                                type="text"
                                placeholder="Estado"
                                className="home__hero__form"
                                {...register("province", {})}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={12} md={3} className="mb-2">
                            <Form.Group>
                              <Form.Control
                                disabled={watch("category")}
                                type="text"
                                placeholder="Ciudad"
                                className="home__hero__form"
                                {...register("city", {})}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <Form.Group>
                              <Button type="submit" className="text-light">
                                Buscar ofertas
                              </Button>
                              <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => {
                                  reset();
                                }}
                              >
                                Borrar búsqueda
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <div className="jobs__divider">
            <Container>
              <div
                className="w-100 border-5 bg-primary rounded-pill"
                style={{ height: 10 }}
              ></div>
            </Container>
          </div>
        </>
      )}
      <section className="jobs__list pt-3 pb-5 ">
        <Container>
          <Row>
            <Col>
              {filter === "all" ? (
                <h2>Todas las ofertas</h2>
              ) : (
                <h3>
                  {filter}:<br />
                  <span className="text-capitalize text-primary">
                    {filter === "Categoría" ? category : location.join(" ")}
                  </span>
                </h3>
              )}
            </Col>
          </Row>
          <Row className="pb-3">
            <Col className="text-muted">
              <h3>{jobs && `${jobs.length ? jobs.length : '0'} ofertas`}</h3>
            </Col>
          </Row>
          <Row>
            {!!jobs ? (
              jobs.length > 0 ? (
                jobs.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).map((job) => (
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
    </div>
  );
};

export default Jobs;
