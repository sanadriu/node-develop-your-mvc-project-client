import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignOut() {
	const { user, logout, clear } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		return clear;
	}, [clear]);

	useEffect(() => {
		if (!user) navigate("/home", { replace: true });
	}, [navigate, user]);

	useEffect(() => {
		logout();
		navigate("/home", { replace: true });
	}, [navigate, logout]);

	return null;
}
