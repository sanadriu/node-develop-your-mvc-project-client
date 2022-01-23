import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../../contexts/AuthContext";
import { useFetchUser, useUpdateUser } from "../../../hooks";
import validationSchema from "./schema";

import Error from "../../../components/Error";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function UserFormEdit() {
	const navigate = useNavigate();
	const { idUser } = useParams();
	const { user } = useAuth();
	const { request: fetchRequest, response: fetchResponse = {} } = useFetchUser();
	const { request: updateRequest, response: updateResponse = {} } = useUpdateUser();

	const { data: user } = response;

	const formik = useFormik({
		initialValues: {
			...user,
			passwordChange: false,
			password: "",
			passwordConfirm: "",
		},
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values, actions) => {
			const { setSubmitting } = actions;
			const { password, passwordChange, passwordConfirm, ...data } = values;

			const token = user.accessToken;
			const params = {
				id: idUser,
			};

			if (passwordChange) data.password = password;

			setSubmitting(true);

			updateRequest.send({ token, params, data }).finally(() => setSubmitting(false));
		},
	});

	const {
		values,
		errors,
		touched,
		isValid,
		isValidating,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
		setErrors,
		setTouched,
	} = formik;

	useEffect(() => {
		if (!user) return;

		const token = user.accessToken;
		const params = {
			id: idUser,
		};

		fetchRequest.send({ token, params });
	}, [fetchRequest.send, user, idUser]);

	useEffect(() => {
		if (updateRequest.status === "done") {
			setTimeout(() => navigate("./.."), 2000);
		}
	}, [navigate, updateRequest.status]);

	return (
		<Container as="main">
			{fetchRequest.status === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{fetchRequest.status === "done" && fetchResponse.success && (
				<>
					<div className="d-flex justify-content-between align-items-center">
						<h1 className="fw-light m-0">Edit User</h1>
						<span className="fw-light">{`User #${idUser}`}</span>
					</div>
					<hr className="mt-2 mb-3" />
					{updateRequest.status === "done" && updateResponse.success && (
						<Alert variant="success text-center">User updated successfully</Alert>
					)}
					{updateRequest.status === "done" && !updateResponse.success && (
						<Alert variant="success text-center">{updateResponse.message}</Alert>
					)}
					{updateRequest.status === "error" && (
						<Alert variant="danger text-center">{updateRequest.error.message}</Alert>
					)}
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
									<option value="">Select role</option>
									<option value="admin">Admin</option>
									<option value="customer">Customer</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
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
							<InputGroup hasValidation>
								<Form.Check
									id="input_password_change"
									name="passwordChange"
									isInvalid={Boolean(touched.passwordChange && errors.passwordChange)}
									value={values.passwordChange}
									onChange={(event) => {
										setTouched({ password: false, passwordConfirm: false }, false);
										setErrors({ password: false, passwordConfirm: false }, false);
										handleChange(event);
									}}
									onBlur={handleBlur}
									label="Change password"
								/>
								<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						{values.passwordChange && (
							<>
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
							</>
						)}
						<Button
							className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
							variant="primary"
							size="sm"
							type="submit"
							disabled={!isValid || isValidating || isSubmitting}
						>
							<span>Update User</span>
							{isSubmitting && <div className="spinner-border spinner-border-sm" role="status"></div>}
						</Button>
					</Form>
				</>
			)}
			{fetchRequest.status === "done" && !fetchResponse.success && <Error message={fetchRequest.error.message} />}
			{fetchRequest.status === "error" && <Error message={fetchRequest.error.message} />}
		</Container>
	);
}
