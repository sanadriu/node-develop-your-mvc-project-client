import { Container } from "react-bootstrap";
import image from "../../images/error.png";

export default function Error(props) {
	const { message } = props;

	return (
		<Container
			fluid="sm"
			className="bg-light d-flex flex-column align-items-center rounded-2 shadow p-3"
			style={{ width: "32rem" }}
		>
			<img src={image} alt="error" style={{ width: "16rem" }} />
			<h5 className="fs-1 fw-normal text-center">OOPS!</h5>
			<h6 className="fs-4 fw-light text-center">Something went wrong...</h6>
			{message && <p className="text-muted fw-light text-center mt-3">{message}</p>}
		</Container>
	);
}
