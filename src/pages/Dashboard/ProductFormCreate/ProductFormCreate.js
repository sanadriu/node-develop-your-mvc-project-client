import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../../contexts/AuthContext";
import { useCreateProduct } from "../../../hooks";
import schema from "./schema";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

export default function ProductFormCreate(props) {
	const { currentUser } = useAuth();
	const [{ status, error }, createProduct] = useCreateProduct();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			price: 0,
			stock: 0,
			image: "",
		},
		validationSchema: schema,
		onSubmit: (values, actions) => {
			const { setSubmitting } = actions;

			const data = {
				title: values.title,
				description: values.description,
				price: values.price,
				stock: values.stock,
				images: [values.image],
			};

			setSubmitting(true);
			createProduct(currentUser?.accessToken, data).finally(() => setSubmitting(false));
		},
	});

	useEffect(() => {
		if (status === "success") {
			setTimeout(() => navigate("./.."), 2000);
		}
	}, [navigate, status]);

	const { values, errors, touched, isValid, isValidating, isSubmitting, handleBlur, handleChange, handleSubmit } =
		formik;

	return (
		<Container as="main">
			<h1 className="fw-light m-0">Create Product</h1>
			<hr className="mt-2 mb-3" />
			{status === "error" && <Alert variant="danger text-center">{error.message}</Alert>}
			{status === "success" && <Alert variant="success text-center">Product created successfully</Alert>}
			<Form className="p-4" onSubmit={handleSubmit}>
				<div className="d-flex gap-2">
					<Form.Group className="w-50 mb-3">
						<Form.Label htmlFor="input_title">Title</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input_title"
								name="title"
								type="text"
								isInvalid={Boolean(touched.title && errors.title)}
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group className="w-25 mb-3">
						<Form.Label htmlFor="input_price">Price</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input_price"
								name="price"
								type="text"
								isInvalid={Boolean(touched.price && errors.price)}
								value={values.price}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group className="w-25 mb-3">
						<Form.Label htmlFor="input_stock">Stock</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input_stock"
								name="stock"
								type="number"
								isInvalid={Boolean(touched.stock && errors.stock)}
								value={values.stock}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</div>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_description">Description</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							as="textarea"
							style={{ resize: "none", height: "10rem" }}
							id="input_description"
							name="description"
							type="text"
							isInvalid={Boolean(touched.description && errors.description)}
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_image">Image (url)</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input_image"
							name="image"
							type="text"
							isInvalid={Boolean(touched.image && errors.image)}
							value={values.image}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Button
					className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
					variant="primary"
					size="sm"
					type="submit"
					disabled={!isValid || isValidating || isSubmitting}
				>
					<span>Create Product</span>
					{isSubmitting && <div className="spinner-border spinner-border-sm" role="status"></div>}
				</Button>
			</Form>
		</Container>
	);
}
