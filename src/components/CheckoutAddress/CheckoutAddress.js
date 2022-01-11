import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../contexts/CheckoutContext";
import schema from "./schema";

import { Form, InputGroup } from "react-bootstrap";

export default function CheckoutAddress() {
	const navigate = useNavigate();
	const {
		state: { shippingAddress, step },
		goBack,
		goNext,
		setShippingAddress,
	} = useCheckout();

	useEffect(() => {
		if (step !== 1) navigate(`../${step}`);
	}, [navigate, step]);

	const formik = useFormik({
		initialValues: {
			...shippingAddress,
		},
		validationSchema: schema,
		onSubmit: (values, actions) => {
			const { setSubmitting } = actions;

			setSubmitting(true);
			setTimeout(() => {
				setShippingAddress(values);
				goNext();
			}, 250);
		},
	});

	const { values, errors, touched, isValid, isValidating, isSubmitting, handleBlur, handleChange, handleSubmit } =
		formik;

	return (
		<Form onSubmit={handleSubmit} className="w-100 p-3">
			<Form.Group className="mb-3">
				<Form.Label htmlFor="address">Address*</Form.Label>
				<InputGroup hasValidation>
					<Form.Control
						type="text"
						name="address"
						id="address"
						placeholder="Your address..."
						value={values.address}
						onChange={handleChange}
						onBlur={handleBlur}
						autoFocus
						isInvalid={touched.address && errors.address}
					/>
					<Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="address">City*</Form.Label>
				<InputGroup hasValidation>
					<Form.Control
						type="text"
						name="city"
						id="city"
						placeholder="Your city..."
						value={values.city}
						onChange={handleChange}
						onBlur={handleBlur}
						isInvalid={touched.city && errors.city}
					/>
					<Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="address">Postal Code*</Form.Label>
				<InputGroup hasValidation>
					<Form.Control
						type="text"
						name="postalCode"
						id="postalCode"
						placeholder="Your postal code..."
						value={values.postalCode}
						onChange={handleChange}
						onBlur={handleBlur}
						isInvalid={touched.postalCode && errors.postalCode}
					/>
					<Form.Control.Feedback type="invalid">{errors.postalCode}</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="address">Country</Form.Label>
				<InputGroup hasValidation>
					<Form.Select
						name="countryCode"
						id="countryCode"
						placeholder="Your postal code..."
						value={values.countryCode}
						onChange={handleChange}
						isInvalid={touched.countryCode && errors.countryCode}
					>
						<option value="">Select country</option>
						<option value="ES">Spain</option>
						<option value="US">United States</option>
						<option value="MX">Mexico</option>
					</Form.Select>
					<Form.Control.Feedback type="invalid">{errors.countryCode}</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>
			<div className="d-flex my-2 gap-2">
				<button
					type="button"
					className="btn btn-outline-secondary w-50"
					disabled={isValidating || isSubmitting}
					onClick={goBack}
				>
					Go back
				</button>
				<button className="btn btn-secondary w-50" disabled={!isValid || isValidating || isSubmitting} type="submit">
					Continue
				</button>
			</div>
		</Form>
	);
}
