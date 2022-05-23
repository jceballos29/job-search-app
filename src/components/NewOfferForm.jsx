import React, { useContext } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import jobs from "../api/jobs";
import { authContext } from "../context/AuthContext";

const NewOfferForm = () => {
  const context = useContext(authContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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

  return (
    <Card className="border-0 shadow-sm border-top border-5 border-primary">
      <Card.Body>
        <Card.Title as="h3" className="mb-4">
          Nueva Oferta
        </Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            {errors.title && (
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
                * {errors.description.message}
              </p>
            )}
            <FloatingLabel label="Descripción" className="mb-3 text-muted">
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
              <p className="text-danger mb-1" style={{ fontSize: 10 }}>
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
            <Button variant="primary" size="lg" type="submit" className="w-100">
              Agregar Oferta
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewOfferForm;
