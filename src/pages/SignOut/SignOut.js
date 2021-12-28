import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignOut(props) {
	const { currentUser, signOut, resetAuthError } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		return resetAuthError;
	}, [resetAuthError]);

	useEffect(() => {
		navigate("/home", { replace: true });
	}, [navigate, currentUser]);

	useEffect(() => {
		signOut();
		navigate("/home", { replace: true });
	}, [navigate, signOut]);

	return null;
}
