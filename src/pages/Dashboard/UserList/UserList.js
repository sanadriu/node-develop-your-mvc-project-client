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

export default function UserList(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const { currentUser } = useAuth();
	const [{ status: getStatus, error: getError, response }, getUsers] = useFetchUsers();
	const [{ status: deleteStatus, error: deleteError }, deleteUser] = useDeleteUser();
	const { data: users, lastPage } = response;
	const navigate = useNavigate();

	const handleDelete = (id) => {
		deleteUser(currentUser?.accessToken, id);
	};

	useEffect(() => {
		getUsers(currentUser?.accessToken, currentPage);
	}, [getUsers, currentUser, currentPage]);

	useEffect(() => {
		if (deleteStatus === "success") {
			getUsers(currentUser?.accessToken, currentPage);
		}
	}, [getUsers, currentUser, currentPage, deleteStatus]);

	return (
		<Container as="main">
			{getStatus === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{getStatus === "success" && users && (
				<>
					<Container className="mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Users</h1>
							{currentUser?.role === "main-admin" && (
								<Button variant="outline-secondary" onClick={() => navigate("new")}>
									<AddIcon />
								</Button>
							)}
						</div>
						<hr className="mt-2 mb-3" />
						{deleteStatus === "error" && <Alert variant="danger text-center">{deleteError.message}</Alert>}
						{deleteStatus === "success" && <Alert variant="success text-center">User deleted successfully</Alert>}
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
									{currentUser?.role === "main-admin" && (
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
			{getStatus === "error" && <Error message={getError.message} />}
		</Container>
	);
}
