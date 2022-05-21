import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FloatingLabel,
  Image as Img,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Image from "react-image-webp";

import logo from "../assets/images/logo_invert.jpg";
import backgroundImage from "../assets/images/register.jpg";
import backgroundImageWebp from "../assets/images/register.webp";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import auth from "../api/auth";
import { toast } from "react-toastify";

const Register = () => {
  const context = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    context.setAuth({ ...context.auth, loading: true });
    const result = await auth.register(data);
    if (result.status === 200) {
      context.setAuth({
        isAuthenticated: true,
        user: result.data.user,
        loading: false,
      });
      toast.success("Registro exitoso.");
      reset();
    } else {
      context.setAuth({ ...context.auth, loading: false });
      toast.error("Error al registrar.");
    }
  };

  return (
    <div className="register">
      <Image
        webp={backgroundImageWebp}
        src={backgroundImage}
        className="register__background fluid"
      />
      <div className="register__filter"></div>
      <div className="register__content">
        <Container>
          <Row>
            <Col
              sm={12}
              lg={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Img src={logo} alt="logo" className="w-100 mb-3 rounded" />
              <Card className="w-100 border-0 shadow-lg border-top border-5 border-primary">
                <Card.Body>
                  <Card.Title className="text-center mb-4">
                    <h1>Registro</h1>
                  </Card.Title>

                  <Form onSubmit={handleSubmit(onSubmit)} className="px-lg-3">
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Nombre">
                        <Form.Control
                          type="name"
                          placeholder="Tu nombre"
                          {...register("name", {
                            required: "Tú nombre es requerido",
                          })}
                        />
                      </FloatingLabel>
                      {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Correo electrónico">
                        <Form.Control
                          type="email"
                          placeholder="example@correo.com"
                          {...register("email", {
                            required: "Correo electrónico es requerido",
                          })}
                        />
                      </FloatingLabel>
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Contraseña">
                        <Form.Control
                          type="password"
                          placeholder="********"
                          {...register("password", {
                            required: "Contraseña es requerida",
                          })}
                        />
                      </FloatingLabel>
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                      <Form.Check
                        inline
                        label="Solicitante"
                        name="group1"
                        type={"radio"}
                        value={"applicant"}
                        defaultChecked
                        {...register("role", { required: "Role requerido" })}
                      />
                      <Form.Check
                        inline
                        label="Empleador"
                        name="group1"
                        type={"radio"}
                        value={"employer"}
                        {...register("role", { required: "Role requerido" })}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit" size="lg" className="w-100 my-3">
                        Registrar
                      </Button>
                    </Form.Group>
                  </Form>
                  <div
                    className="text-muted text-center mt-3"
                    style={{ fontSize: "14px" }}
                  >
                    ¿Ya tienes cuenta?&nbsp;
                    <Link to={"/ingreso"}>Inicia sesión</Link>
                  </div>
                </Card.Body>
              </Card>

              <p
                className="text-light text-center mt-4"
                style={{ fontSize: 10 }}
              >
                &copy; {new Date().getFullYear()} Job Search.
                <br />
                Todos los derechos reservados.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Register;
