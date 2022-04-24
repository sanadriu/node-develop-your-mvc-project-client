import { useParams } from "react-router-dom";
import { getOrder } from "../api/orders.api";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "./useRequest";

export function useOrderDetails() {
	const { idOrder } = useParams();
	const { getCurrentUserToken } = useAuth();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getOrder);

	useEffect(() => {
		getCurrentUserToken().then((token) => {
			sendRequest({ token, id: idOrder });
		});
	}, [sendRequest, idOrder]);

	return { getRequest: { response, error, isLoading, isFailed } };
}
