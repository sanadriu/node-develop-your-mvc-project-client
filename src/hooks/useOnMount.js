import { useEffect, useState } from "react";

export function useOnMount(effectCallback) {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		if (!isMounted) {
			setMounted(true);

			return effectCallback();
		}
	}, [isMounted, setMounted, effectCallback]);
}
