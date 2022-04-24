import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import schema from "../validation/signIn.schema";

export function useSignIn() {
	const { user, signInState, signIn, signInReset } = useAuth();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		signInReset();

		return () => signInReset();
	}, [signInReset]);

	useEffect(() => {
		if (user) navigate("/home", { replace: true });
	}, [user, navigate]);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			const data = Object.fromEntries(new FormData(event.target));

			schema
				.validate(data, { abortEarly: false })
				.then(() => {
					signIn(data);
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
		[signIn, setErrors]
	);

	return { handleSubmit, signInState, errors };
}
