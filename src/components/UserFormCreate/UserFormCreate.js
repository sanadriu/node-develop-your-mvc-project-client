import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateUser } from "../../hooks";
import schema from "./schema";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserFormCreate(props) {
	const { currentUser } = useAuth();
	const [{ status, error }, createUser] = useCreateUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (status === "success") {
			setTimeout(() => navigate("./.."), 2000);
		}
	}, [navigate, status]);

	const formik = useFormik({
		initialValues: {
			role: "",
			email: "",
			phone: "",
			firstname: "",
			lastname: "",
			password: "",
			passwordConfirm: "",
		},
		validationSchema: schema,
		onSubmit: (values, actions) => {
			const { setSubmitting } = actions;

			setSubmitting(true);
			createUser(currentUser?.accessToken, values).finally(() => setSubmitting(false));
		},
	});

	const { values, errors, touched, isValid, isValidating, isSubmitting, handleBlur, handleChange, handleSubmit } =
		formik;

	return (
		<Container as="main">
			<h1 className="fw-light m-0">Create user</h1>
			<hr className="mt-2 mb-3" />
			{status === "error" && <Alert variant="danger text-center">{error.message}</Alert>}
			{status === "success" && <Alert variant="success text-center">User created successfully</Alert>}
			<Form className="p-4" onSubmit={handleSubmit}>
				<div className="d-flex gap-2">
					<Form.Group className="w-50 mb-3">
						<Form.Label htmlFor="input_firstname">First name</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input_firstname"
								name="firstname"
								type="text"
								isInvalid={Boolean(touched.firstname && errors.firstname)}
								value={values.firstname}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group className="w-50 mb-3">
						<Form.Label htmlFor="input_lastname">Last name</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input_lastname"
								name="lastname"
								type="text"
								isInvalid={Boolean(touched.lastname && errors.lastname)}
								value={values.lastname}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</div>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_role">User role</Form.Label>
					<InputGroup hasValidation>
						<Form.Select
							id="input_role"
							name="role"
							isInvalid={Boolean(touched.role && errors.role)}
							value={values.role}
							onChange={handleChange}
						>
							<option value={undefined}>Select role</option>
							<option value="admin">Admin</option>
							<option value="customer">Customer</option>
						</Form.Select>
						<Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_email">Email address</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input_email"
							name="email"
							type="text"
							isInvalid={Boolean(touched.email && errors.email)}
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_phone">Phone number</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input_phone"
							name="phone"
							type="tel"
							isInvalid={Boolean(touched.phone && errors.phone)}
							value={values.phone}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_password">Password</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input_password"
							name="password"
							type="password"
							isInvalid={Boolean(touched.password && errors.password)}
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input_password_confirm">Password confirmation</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input_password_confirm"
							name="passwordConfirm"
							type="password"
							isInvalid={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
							value={values.passwordConfirm}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Button
					className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
					variant="primary"
					size="sm"
					type="submit"
					disabled={!isValid || isValidating || isSubmitting}
				>
					<span>Create User</span>
					{isSubmitting && <div className="spinner-border spinner-border-sm" role="status"></div>}
				</Button>
			</Form>
		</Container>
	);
}
