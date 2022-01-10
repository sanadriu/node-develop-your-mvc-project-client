import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Product from "./pages/Product/";
import CreateProduct from "./components/ProductCard/CreateProduct";


function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-out" element={<SignOut />} />
					<Route path="/product" element={<Product />} />
					<Route path="/createproduct" element={< CreateProduct/>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
