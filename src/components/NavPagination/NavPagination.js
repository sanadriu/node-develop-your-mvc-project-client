import Pagination from "react-bootstrap/Pagination";
import { usePagination } from "../../hooks/usePagination";

const offset = 2;

export default function NavPagination({ lastPage = 1 }) {
	const { page, setPage } = usePagination();

	const start = page - offset < 1 ? 1 : page - offset;
	const end = page + offset > lastPage ? lastPage : page + offset;

	const length = end - start || 1;
	const list = Array.from({ length }, (v, i) => start + i);

	if (!page || !lastPage) return null;

	return (
		<Pagination>
			<Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
			<Pagination.Prev disabled={page <= 1} onClick={() => setPage(page - 1)} />
			{list.map((index) => (
				<Pagination.Item
					key={`page-${page}`}
					active={index === page}
					disabled={index === page}
					onClick={() => setPage(index)}
				>
					{index}
				</Pagination.Item>
			))}
			<Pagination.Next disabled={page >= lastPage} onClick={() => setPage(page + 1)} />
			<Pagination.Last disabled={page === lastPage} onClick={() => setPage(lastPage)} />
		</Pagination>
	);
}
