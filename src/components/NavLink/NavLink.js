import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink(props) {
	const { className, children, to } = props;

	return (
		<RouterNavLink
			className={({ isActive }) => `nav-link ${className ? className : ""} ${isActive ? "active" : ""}`.trim()}
			to={to}
		>
			{children}
		</RouterNavLink>
	);
}
