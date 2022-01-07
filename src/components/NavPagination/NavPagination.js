import Pagination from "react-bootstrap/Pagination";

export default function NavPagination(props) {
	const { currentPage, lastPage, setCurrentPage } = props;
	const offset = 1;
	const length = offset * 2 + 1;

	let start = currentPage - offset;
	let end = currentPage + offset;

	if (end > lastPage - offset * 2) start = lastPage - offset * 2;
	if (start < 1) start = 1;

	const Items = Array.from({ length: length < lastPage ? length : lastPage }, (v, index) => {
		const page = start + Number(index);

		return (
			<Pagination.Item
				key={`page-${page}`}
				active={page === currentPage}
				disabled={page < 1 || page > lastPage}
				onClick={() => setCurrentPage(page)}
			>
				{page}
			</Pagination.Item>
		);
	});

	return (
		<>
			{currentPage && lastPage && (
				<Pagination>
					<Pagination.First disabled={currentPage <= 1} onClick={() => setCurrentPage(1)} />
					<Pagination.Prev disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} />
					{Items}
					<Pagination.Next disabled={currentPage >= lastPage} onClick={() => setCurrentPage(currentPage + 1)} />
					<Pagination.Last disabled={currentPage >= lastPage} onClick={() => setCurrentPage(lastPage)} />
				</Pagination>
			)}
		</>
	);
}
