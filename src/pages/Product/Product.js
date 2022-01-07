import Header from "../../components/Header";
import Container from "react-bootstrap/Container";

export default function Product(props) {
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="flex-basis-1 p-2">
				<Container className="d-flex flex-column justify-content-center align-items-center" fluid>

				</Container>
			</main>
		</div>
	);
}