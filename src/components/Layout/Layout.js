import { Container } from "react-bootstrap";
import Header from "../Header";

export default function Layout({ children }) {
	return (
		<Container className="d-flex flex-column min-vh-100 p-0" fluid>
			<Header />
			<Container as="main" className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
				{children}
			</Container>
		</Container>
	);
}
