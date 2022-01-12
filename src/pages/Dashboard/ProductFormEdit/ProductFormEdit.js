import { useFormik } from "formik";
import { useAuth } from "../../../contexts/AuthContext";
import { useUpdateProduct, useFetchProduct } from "../../../hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import schema from "./schema";

import Error from "../../../components/Error";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function ProductFormEdit(props) {
	const { idProduct } = useParams();
	const { currentUser } = useAuth();
	const [{ status: getStatus, error: getError, response }, getProduct] = useFetchProduct();
	const [{ status: updateStatus, error: updateError }, updateProduct] = useUpdateProduct();
	const { data: product } = response;
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			title: product?.title || "",
			description: product?.description || "",
			price: product?.price || 0,
			stock: product?.stock || 0,
			image: product?.images[0] || "",
		},
		enableReinitialize: true,
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
			updateProduct(currentUser?.accessToken, idProduct, data).finally(() => setSubmitting(false));
		},
	});

	useEffect(() => {
		getProduct(idProduct);
	}, [getProduct, idProduct]);

	useEffect(() => {
		if (updateStatus === "success") {
			setTimeout(() => navigate("./.."), 2000);
		}
	}, [navigate, updateStatus]);

	const { values, errors, touched, isValid, isValidating, isSubmitting, handleBlur, handleChange, handleSubmit } =
		formik;

	return (
		<Container as="main">
			{getStatus === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{getStatus === "success" && product && (
				<>
					<div className="d-flex justify-content-between align-items-center">
						<h1 className="fw-light m-0">Edit Product</h1>
						<span className="fw-light">{`Product #${idProduct}`}</span>
					</div>
					<hr className="mt-2 mb-3" />
					{updateStatus === "error" && <Alert variant="danger text-center">{updateError.message}</Alert>}
					{updateStatus === "success" && <Alert variant="success text-center">Product updated successfully</Alert>}
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
							<span>Update Product</span>
							{isSubmitting && <div className="spinner-border spinner-border-sm" role="status"></div>}
						</Button>
					</Form>
				</>
			)}
			{getStatus === "error" && <Error message={getError.message} />}
		</Container>
	);
}
