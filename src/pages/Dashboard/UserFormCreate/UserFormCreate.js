import { useCreateUser } from "../../../hooks/useCreateUser";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

export default function UserFormCreate() {
	const {
		form: { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, isValidating },
		createRequest: { response, error, isLoading, isFailed },
	} = useCreateUser();

	const CreateAlert = isFailed ? (
		<Alert variant="danger text-center">{error?.message}</Alert>
	) : response?.success === false ? (
		<Alert variant="danger text-center">{response?.message}</Alert>
	) : response?.success === true ? (
		<Alert variant="success text-center">{response?.message}</Alert>
	) : null;

	return (
		<Container as="main">
			<h1 className="fw-light m-0">Create user</h1>
			<hr className="mt-2 mb-3" />
			{!isLoading && CreateAlert}
			<Form className="p-4" onSubmit={handleSubmit}>
				<div className="d-flex gap-2">
					<Form.Group className="w-50 mb-3">
						<Form.Label htmlFor="input-firstname">First name</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input-firstname"
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
						<Form.Label htmlFor="input-lastname">Last name</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								id="input-lastname"
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
					<Form.Label htmlFor="input-role">User role</Form.Label>
					<InputGroup hasValidation>
						<Form.Select
							id="input-role"
							name="role"
							isInvalid={Boolean(touched.role && errors.role)}
							value={values.role}
							onChange={handleChange}
						>
							<option value="">Select role</option>
							<option value="admin">Admin</option>
							<option value="customer">Customer</option>
						</Form.Select>
						<Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="input-email">Email address</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input-email"
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
					<Form.Label htmlFor="input-phone">Phone number</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input-phone"
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
					<Form.Label htmlFor="input-password">Password</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input-password"
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
					<Form.Label htmlFor="input-password-confirm">Password confirmation</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							id="input-password-confirm"
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
					disabled={!isValid || isValidating || isLoading}
				>
					<span>Create user</span>
					{isLoading && <div className="spinner-border spinner-border-sm" role="status"></div>}
				</Button>
			</Form>
		</Container>
	);
}
