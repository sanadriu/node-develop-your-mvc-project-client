import { useState } from "react";
import { useFetchProducts } from "../../hooks";

import Header from "../../components/Header";
import NavPagination from "../../components/NavPagination";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home(props) {
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="flex-grow-1 p-5">
				
			</main>
		</div>
	);
}