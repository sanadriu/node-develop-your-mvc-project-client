import { useCreateProduct } from "../../../hooks/useCreateProduct";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

export default function ProductFormCreate() {
	const {
		form: { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, isValidating },
		createRequest: { response, error, isLoading, isFailed },
	} = useCreateProduct();

	const CreateAlert = isFailed ? (
		<Alert variant="danger text-center">{error?.message}</Alert>
	) : response?.success === false ? (
		<Alert variant="danger text-center">{response?.message}</Alert>
	) : response?.success === true ? (
		<Alert variant="success text-center">{response?.message}</Alert>
	) : null;

	return (
		<Container as="main">
			<h1 className="fw-light m-0">Create product</h1>
			<hr className="mt-2 mb-3" />
			{!isLoading && CreateAlert}
			<Form className="p-4" onSubmit={handleSubmit}>
				<div className="d-flex gap-2">
					<Form.Group className="w-50 mb-3">
						<Form.Label htmlFor="input-title">Title</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input-title"
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
						<Form.Label htmlFor="input-price">Price</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input-price"
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
						<Form.Label htmlFor="input-stock">Stock</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input-stock"
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
					<Form.Label htmlFor="input-description">Description</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							as="textarea"
							style={{ resize: "none", height: "10rem" }}
							id="input-description"
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
					<Form.Label htmlFor="input-image">Image (url)</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input-image"
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
					disabled={!isValid || isValidating || isLoading}
				>
					<span>Create product</span>
					{isLoading && <div className="spinner-border spinner-border-sm" role="status"></div>}
				</Button>
			</Form>
		</Container>
	);
}
