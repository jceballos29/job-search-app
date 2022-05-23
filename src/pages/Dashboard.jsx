import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/app.scss";
import { authContext } from "../context/AuthContext";
import OfferCard from "../components/OfferCard";
import ApplicationCard from "../components/ApplicationCard";
import NewOfferForm from "../components/NewOfferForm";

const Dashboard = () => {
  const context = useContext(authContext);

  return (
    <div className="dashboard page pt-5">
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
                      context.auth.offers
                        .sort(
                          (a, b) =>
                            new Date(b.creationDate) - new Date(a.creationDate)
                        )
                        .map((job) => <OfferCard job={job} key={job._id} />)
                    ) : (
                      <h4 className="text-muted">No tienes ofertas</h4>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm={12} lg={4}>
                <NewOfferForm />
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
                  context.auth.applications
                    .sort(
                      (a, b) =>
                        new Date(b.creationDate) - new Date(a.creationDate)
                    )
                    .map((application) => (
                      <ApplicationCard
                        key={application._id}
                        application={application}
                      />
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
