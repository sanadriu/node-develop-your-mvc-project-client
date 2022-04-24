import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import schema from "../validation/signUp.schema";

export function useSignUp() {
	const { user, signUpState, signUp, signUpReset } = useAuth();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		signUpReset();

		return () => signUpReset();
	}, [signUpReset]);

	useEffect(() => {
		if (user) navigate("/home");
	}, [user, navigate]);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			const data = Object.fromEntries(new FormData(event.target));

			schema
				.validate(data, { abortEarly: false })
				.then(() => {
					signUp(data);
					setErrors(() => {});
				})
				.catch((validationErrors) => {
					const errors = {};

					validationErrors.inner.forEach(({ path, message }) => {
						errors[path] ||= message;
					});

					setErrors(() => errors);
				});
		},
		[signUp, setErrors]
	);

	return { handleSubmit, signUpState, errors };
}
