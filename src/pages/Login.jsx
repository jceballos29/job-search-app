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
import backgroundImage from "../assets/images/login.jpg";
import backgroundImageWebp from "../assets/images/login.webp";
import auth from "../api/auth";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const context = useContext(authContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    context.setAuth({ ...context.auth, loading: true });
    const result = await auth.login(data);
    console.log(result);
    if (result.status === 200) {
      context.setAuth({
        isAuthenticated: true,
        user: result.data.user,
        loading: false,
      });
      toast.success("Inicio de sesión exitoso.");
      reset();
    } else {
      context.setAuth({ ...context.auth, loading: false });
      toast.error("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login">
      <Image
        webp={backgroundImageWebp}
        src={backgroundImage}
        className="login__background fluid"
      />
      <div className="login__filter"></div>
      <div className="login__content">
        <Container>
          <Row className="justify-content-lg-end">
            <Col
              sm={12}
              lg={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Img src={logo} alt="logo" className="w-100 mb-3 rounded" />
              <Card className="w-100 border-0 shadow-lg border-top border-5 border-primary">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    <h1>Iniciar sesión</h1>
                  </Card.Title>

                  <Form onSubmit={handleSubmit(onSubmit)} className="px-lg-3">
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Correo electrónico">
                        <Form.Control
                          type="email"
                          placeholder="Correo electrónico"
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
                    <Form.Group>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-100 my-3"
                        disabled={context.auth.loading}
                      >
                        {context.auth.loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span className="ms-2">Iniciando sesión...</span>
                          </>
                        ) : (
                          <>Iniciar sesión</>
                        )}
                      </Button>
                    </Form.Group>
                  </Form>
                  <div
                    className="text-muted text-center mt-3"
                    style={{ fontSize: "14px" }}
                  >
                    ¿Aún no tienes cuenta?&nbsp;
                    <Link to={"/registro"}>Regístrate</Link>
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

export default Login;
