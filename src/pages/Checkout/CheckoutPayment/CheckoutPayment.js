import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../contexts/CheckoutContext";
import schema from "./schema";

import { Form, InputGroup } from "react-bootstrap";

export default function CheckoutPayment(props) {
	const navigate = useNavigate();
	const {
		state: { paymentDetails, step },
		goBack,
		goNext,
		setPaymentDetails,
	} = useCheckout();

	useEffect(() => {
		if (step !== 2) navigate(`../${step}`);
	}, [navigate, step]);

	const formik = useFormik({
		initialValues: {
			...paymentDetails,
		},
		validationSchema: schema,
		onSubmit: (values, actions) => {
			const { setSubmitting } = actions;

			setSubmitting(true);
			setPaymentDetails(values);
			goNext();
		},
	});

	const { values, errors, touched, isValid, isValidating, isSubmitting, handleBlur, handleChange, handleSubmit } =
		formik;

	return (
		<>
			<Form onSubmit={handleSubmit} className="w-100 py-3 px-4">
				<Form.Group className="mb-3">
					<Form.Label htmlFor="address">Cardholder*</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							name="cardHolderName"
							id="cardHolderName"
							placeholder="Card holder..."
							value={values.cardHolderName}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.cardHolderName && errors.cardHolderName}
						/>
						<Form.Control.Feedback type="invalid">{errors.cardHolderName}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="address">Card number*</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							name="cardNumber"
							id="cardNumber"
							placeholder="0000 0000 0000 0000"
							maxLength={19}
							value={values.cardNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.cardNumber && errors.cardNumber}
						/>
						<Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="address">Card expiration month*</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							name="cardExpirationMonth"
							id="cardExpirationMonth"
							placeholder="00"
							maxLength={2}
							value={values.cardExpirationMonth}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.cardExpirationMonth && errors.cardExpirationMonth}
						/>
						<Form.Control.Feedback type="invalid">{errors.cardExpirationMonth}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="address">Card expiration year*</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							name="cardExpirationYear"
							id="cardExpirationYear"
							placeholder="00"
							maxLength={2}
							value={values.cardExpirationYear}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.cardExpirationYear && errors.cardExpirationYear}
						/>
						<Form.Control.Feedback type="invalid">{errors.cardExpirationYear}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="address">Card CVV*</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="password"
							name="cardCVV"
							id="cardCVV"
							maxLength={3}
							placeholder="Card holder..."
							value={values.cardCVV}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.cardCVV && errors.cardCVV}
						/>
						<Form.Control.Feedback type="invalid">{errors.cardCVV}</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<div className="d-flex justify-content-center my-2 gap-2">
					<button
						type="button"
						className="btn btn-outline-secondary w-25"
						disabled={isValidating || isSubmitting}
						onClick={goBack}
					>
						Go back
					</button>
					<button className="btn btn-secondary w-25" disabled={!isValid || isValidating || isSubmitting} type="submit">
						Continue
					</button>
				</div>
			</Form>
		</>
	);
}
