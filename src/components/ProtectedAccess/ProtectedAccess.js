import { Navigate } from "react-router-dom";

export default function ProtectedAccess({ children, isAllowed, redirectTo }) {
	if (isAllowed) {
		return children;
	} else {
		return <Navigate to={redirectTo} replace />;
	}
}
