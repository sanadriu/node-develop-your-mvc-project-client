import React from "react"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../Header";
import { Container, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import createProductSchema from "./schema";


export default function CreateProduct(props) {

    const formik = useFormik({
        initialValues: {
            title: "",
            price: 0,
            stock: 0,
            image:""
        },
        validationSchema: createProductSchema,
    })
    return (<>
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-basis-1 p-2">
                <Container className="d-flex flex-column justify-content-center align-items-center" fluid>
                    <Form onSubmit={formik.handleSubmit} id="createProduct">
                        <Form.Group className="mb-3" controlId="product">
                            <Form.Label>title product</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="insert model name"
                                    id="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.title && formik.errors.title)}
                                />
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.title}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group bsSize="large" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Describe principal characteristics" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>price</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="insert model name"
                                    id="price"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.price && formik.errors.price)}
                                />
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.price}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="insert model name"
                                    id="stock"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.stock && formik.errors.stock)}
                                />
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.stock}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>image</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="insert URL image"
                                    id="image"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.image && formik.errors.image)}
                                />
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.image}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button
                            submitButton
                            block
                            disabled={formik.isValidating || !formik.isValid}
                            variant="primary"
                        // type="submit"
                        >
                            {formik.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </Form>
                </Container>
            </main>
        </div>
    </>)
}
