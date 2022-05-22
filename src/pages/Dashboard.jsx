import { useContext } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { AiOutlineDollar, AiOutlineEnvironment } from "react-icons/ai";
import { useForm } from "react-hook-form";
import jobs from "../api/jobs";
import "../assets/styles/app.scss";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const context = useContext(authContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const newJob = {
      title: data.title,
      description: data.description,
      category: data.category.split(",").map((item) => item.trim()),
      salary: data.salary,
      location: {
        city: data.city,
        country: data.country,
        province: data.province,
      },
      employer: {
        id: context.auth.user.id,
        name: context.auth.user.name,
        email: context.auth.user.email,
        role: context.auth.user.role,
      },
    };

    console.log(newJob);
    const result = await jobs.createJob(newJob);
    if (result.status === 200) {
      context.setAuth({
        ...context.auth,
        offers: [...context.auth.offers, result.data],
      });
      toast.success("Oferta creada con éxito!");
      reset();
    } else {
      toast.error("Error al crear oferta");
    }
  };

  const handleUnapplyForJob = async (jobId) => {
    console.log(jobId);
    const response = await jobs.unapplyForJob(jobId);
    console.log(response);
    if (response.status === 200) {
      context.setAuth({
        ...context.auth,
        applications: context.auth.applications.filter(
          (job) => job._id !== jobId
        ),
      });
    }
  };

  return (
    <div className="dashboard pt-5">
      <header className="py-5 border-bottom border-5 border-primary text-light">
        <Container className="my-5">
          <Row>
            <Col>
              <h1>Dashboard</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <section className="dashboard__content py-5">
        {context.auth.user.role === "employer" ? (
          <Container>
            <Row>
              <Col sm={12} lg={8}>
                <h2>Tus Ofertas</h2>
                <hr />
                <Row>
                  <Col>
                    {context.auth.offers.length > 0 ? (
                      context.auth.offers.map((job) => (
                        <Card key={job._id} className="mb-3 border-0 shadow-sm">
                          <Card.Body>
                            <Row>
                              <Col sm={7} className="pb-3 pb-md-0">
                                <Card.Text as="h4" className="text-primary">
                                  {job.title}
                                </Card.Text>
                                <Card.Text>{job.description}</Card.Text>
                                {job.category.map((category, index) => (
                                  <Badge
                                    key={index}
                                    className=" text-light text-capitalize me-1"
                                  >
                                    {category}
                                  </Badge>
                                ))}
                              </Col>
                              <Col sm={5} className="pt-3 pt-mb-0">
                                <Row>
                                  <Col><Card.Title as="h5">Solicitantes</Card.Title></Col>
                                  <Col className="text-end"><Card.Title as="h5">{job.applicants.length}</Card.Title></Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <h4 className="text-muted">No tienes ofertas</h4>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm={12} lg={4}>
                <Card className="border-0 shadow-sm border-top border-5 border-primary">
                  <Card.Body>
                    <Card.Title as="h3" className="mb-4">
                      Nueva Oferta
                    </Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group>
                        {errors.title && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.title.message}
                          </p>
                        )}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Título de la oferta"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Titulo Oferta"
                            {...register("title", {
                              required: "Título requerido",
                            })}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group>
                        {errors.description && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.description.message}
                          </p>
                        )}
                        <FloatingLabel
                          label="Descripción"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            as="textarea"
                            placeholder="descripción"
                            style={{ height: "100px" }}
                            {...register("description", {
                              required: "Descripción requerida",
                            })}
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group>
                        {errors.category && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.category.message}
                          </p>
                        )}
                        <FloatingLabel
                          label={
                            <Card.Text>
                              Categorías&nbsp; (
                              <span style={{ fontSize: 12 }}>
                                Separe las categorías por comas.
                              </span>
                              )
                            </Card.Text>
                          }
                          className="text-muted mb-3"
                        >
                          <Form.Control
                            as="textarea"
                            placeholder="category"
                            {...register("category", { required: true })}
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group>
                        {errors.salary && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.salary.message}
                          </p>
                        )}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Salario"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Salario"
                            {...register("salary", {
                              required: "Al menos una categoría es requerida",
                            })}
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Card.Text as="h5">Ubicación</Card.Text>
                      <Form.Group>
                        {errors.country && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.country.message}
                          </p>
                        )}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="País"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            type="text"
                            placeholder="País"
                            {...register("country", {
                              required: "País requerido",
                            })}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group>
                        {errors.province && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.province.message}
                          </p>
                        )}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Estado"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Estado"
                            {...register("province", { required: "Estado" })}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group>
                        {errors.city && (
                          <p
                            className="text-danger mb-1"
                            style={{ fontSize: 10 }}
                          >
                            * {errors.city.message}
                          </p>
                        )}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Ciudad"
                          className="mb-3 text-muted"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Ciudad"
                            {...register("city", {
                              required: "Ciudad requerida",
                            })}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group>
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="w-100"
                        >
                          Agregar Oferta
                        </Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col>
                <h2>Tus Solicitudes</h2>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col>
                {context.auth.applications.length > 0 ? (
                  context.auth.applications.map((application) => (
                    <Card
                      className="border-0 shadow-sw mb-2"
                      key={application._id}
                    >
                      <Card.Body>
                        <Row>
                          <Col
                            sm={12}
                            lg={10}
                            className="job_card__content d-flex flex-column flex-lg-row align-items-center justify-content-start"
                          >
                            <Card.Title className="text-primary text-center text-lg-start mb-0 me-4 w-50">
                              {application.title}
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
                  ))
                ) : (
                  <h4 className="text-muted">
                    No has aplicado a ninguna oferta aún.
                  </h4>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
