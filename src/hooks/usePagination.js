import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams();

	const { page, ...rest } = Object.fromEntries(searchParams.entries());
	const setPage = useCallback(
		(page) => {
			setSearchParams({ ...rest, page });
		},
		[setSearchParams, rest]
	);

	return { page: Number.parseInt(page) || 1, setPage };
}
