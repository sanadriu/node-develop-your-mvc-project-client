import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUsers } from "../../hooks";
import { useAuth } from "../../contexts/AuthContext";

import NavPagination from "../NavPagination";
import { AddIcon, DeleteIcon, EditIcon } from "../Icons";

import Error from "../../components/Error";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function UserList(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const [{ response, status, error }, getUsers] = useFetchUsers();
	const { data: users, lastPage } = response;

	useEffect(() => {
		getUsers(currentUser?.accessToken, currentPage);
	}, [getUsers, currentUser, currentPage]);

	return (
		<Container as="main">
			{status === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{status === "success" && users && (
				<>
					<Container className="mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Users</h1>
							<Button variant="outline-secondary" onClick={() => navigate("new")}>
								<AddIcon />
							</Button>
						</div>
						<hr className="mt-2 mb-3" />
						<ListGroup as="ul">
							{users.map((user) => (
								<ListGroup.Item as="li" xs={12} sm={6} md={3} key={user._id}>
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<span className="fw-light">
												{user.firstname && user.lastname ? `${user.firstname}` : user.email.split("@")[0]}
											</span>
											{" - "}
											<span className="fst-italic">{user.email}</span>
										</div>
										<div className="d-flex gap-2">
											<Button variant="outline-secondary" onClick={() => navigate(user._id)}>
												<EditIcon />
											</Button>
											<Button variant="outline-secondary" onClick={() => {}}>
												<DeleteIcon />
											</Button>
										</div>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Container>
					<Container className="d-flex flex-row justify-content-center">
						<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
					</Container>
				</>
			)}
			{status === "error" && <Error message={error.message} />}
		</Container>
	);
}
