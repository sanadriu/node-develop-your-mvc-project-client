import { AuthContext } from "./AuthContext";

export function AuthConsumer({ children }) {
	return <AuthContext.Consumer>{children}</AuthContext.Consumer>;
}
