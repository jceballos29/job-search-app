import React from "react";

import logo from "../assets/images/logo_invert.jpg";
import backgroundImage from "../assets/images/not_found.jpg";
import backgroundImageWebp from "../assets/images/not_found.webp";
import Image from "react-image-webp";
import { Card, Col, Container, Image as Img, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not_found">
      <Image
        webp={backgroundImageWebp}
        src={backgroundImage}
        className="login__background fluid"
      />
      <div className="not_found__filter"></div>
      <div className="not_found__content">
        <Container>
          <Row className="justify-content-center">
            <Col
              sm={12}
              lg={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Img src={logo} alt="logo" className="w-100 mb-3 rounded" />
              <Card className="w-100 border-0 shadow-lg border-top border-5 border-primary px-4">
                <Card.Body  className="text-center ">
                  <Card.Title>
                    <h2>Página no encontrada</h2>
                  </Card.Title>
                  <Card.Text>
                    <p> La página que estás buscando no existe.</p>
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <p style={{fontSize: 12}}> 
                      Si crees que esto es un error, por favor contacta a un administrador.
                    </p>
                  </Card.Text>
                  <Card.Text>
                    <p >
                      <Link to="/">Volver al inicio</Link>
                    </p>
                  </Card.Text>
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

export default NotFound;
