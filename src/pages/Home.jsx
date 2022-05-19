import React from "react";
import "../styles/home.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home pt-5">
      <section className="home__hero py-5 text-light">
        <Container>
          <Row className="justify-content-start mt-5">
            <Col sm={10} md={8}>
              <h1 className="home__hero__title text-capitalize">
                El mejor lugar para hacer crecer tu{" "}
                <span className="text-primary">carrera</span>
              </h1>
              <p className="home__hero__paragraph mb-4">
                Aliquam Vestibulum Cursus Felis. In Iaculis Iaculis Sapien Ac
                Condimentum. Vestibulum Congue Posuere Lacus, Id Tincidunt
                Pellentesque Dui Non, Semper Orci.
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
    </div>
  );
};

export default Home;
