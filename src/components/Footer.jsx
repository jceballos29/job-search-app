import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-3 bg-dark text-muted text-center" style={{ fontSize: 12 }}>
      <Container>
        <Row>
          <Col>
            &copy; {new Date().getFullYear()} Job Search. &nbsp; Todos los
            derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
