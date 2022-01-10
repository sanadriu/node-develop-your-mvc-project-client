import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Product from "./pages/Product/";
import Dashboard from "./pages/Dashboard";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import UserFormCreate from "./components/UserFormCreate";
import UserFormEdit from "./components/UserFormEdit";

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
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="users" element={<UserList />} />
						<Route path="users/:idUser" element={<UserFormEdit />} />
						<Route path="users/new" element={<UserFormCreate />} />
						<Route path="products" element={<ProductList />} />
						<Route path="products/:idProduct" element={<div>Product</div>} />
						<Route path="products/new" element={<div>New Product</div>} />
					</Route>
					<Route path="/product/:idProduct" element={<Product />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
