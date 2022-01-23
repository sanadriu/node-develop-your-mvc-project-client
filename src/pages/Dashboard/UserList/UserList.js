import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser, useFetchUsers } from "../../../hooks";
import { useAuth } from "../../../contexts/AuthContext";

import Error from "../../../components/Error";
import NavPagination from "../../../components/NavPagination";
import { AddIcon, DeleteIcon, EditIcon } from "../../../components/Icons";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function UserList() {
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const { user } = useAuth();
	const { request: fetchRequest, response: fetchResponse = {} } = useFetchUsers();
	const { request: deleteRequest, response: deleteResponse = {} } = useDeleteUser();

	const { data: users, lastPage } = fetchRequest;

	const handleDelete = (id) => {
		if (!user) return;

		const token = user.accessToken;
		const params = { id };

		deleteRequest.send({ token, params });
	};

	useEffect(() => {
		if (!user) return;

		const token = user.accessToken;
		const params = { page: currentPage };

		fetchRequest.send({ token, params });
	}, [fetchRequest.send, user, currentPage]);

	useEffect(() => {
		if (!user) return;
		if (!(deleteRequest.status === "done" && deleteResponse.success)) return;

		const token = user.accessToken;
		const params = { page: currentPage };

		fetchRequest.send({ token, params });

		setTimeout(() => deleteRequest.clear(), 2000);
	}, [fetchRequest.send, user, currentPage, deleteRequest.clear, deleteRequest.status]);

	return (
		<Container as="main">
			{fetchRequest.status === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{fetchRequest.status === "done" && fetchResponse.success && (
				<>
					<Container className="mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Users</h1>
							{user?.role === "main-admin" && (
								<Button variant="outline-secondary" onClick={() => navigate("new")}>
									<AddIcon />
								</Button>
							)}
						</div>
						<hr className="mt-2 mb-3" />
						{deleteRequest.status === "done" && deleteResponse.success && (
							<Alert variant="success text-center">User deleted successfully</Alert>
						)}
						{deleteRequest.status === "done" && !deleteResponse.success && (
							<Alert variant="danger text-center">{deleteResponseMessage}</Alert>
						)}
						{deleteRequest.status === "error" && (
							<Alert variant="danger text-center">{deleteRequest.error.message.message}</Alert>
						)}
						<ListGroup as="ul">
							{users.map((user) => (
								<ListGroup.Item
									className="d-flex justify-content-between align-items-center"
									as="li"
									xs={12}
									sm={6}
									md={3}
									key={user._id}
								>
									<div>
										<span className="fw-light">
											{user.firstname && user.lastname ? `${user.firstname}` : user.email.split("@")[0]}
										</span>
										{" - "}
										<span className="fst-italic">{user.email}</span>
									</div>
									{user?.role === "main-admin" && (
										<div className="d-flex gap-2">
											<Button variant="outline-secondary" onClick={() => navigate(user._id)}>
												<EditIcon />
											</Button>
											<Button variant="outline-secondary" onClick={() => handleDelete(user._id)}>
												<DeleteIcon />
											</Button>
										</div>
									)}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Container>
					<Container className="d-flex flex-row justify-content-center">
						<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
					</Container>
				</>
			)}
			{fetchRequest.status === "done" && !fetchResponse.success && <Error message={fetchResponse.message} />}
			{fetchRequest.status === "error" && <Error message={fetchRequest.error.message} />}
		</Container>
	);
}
