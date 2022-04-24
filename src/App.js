import { AuthConsumer, AuthProvider } from "./contexts/AuthContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { CartProvider } from "./contexts/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Product from "./pages/Product/";
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/Checkout/CheckoutAddress";
import CheckoutPayment from "./pages/Checkout/CheckoutPayment";
import CheckoutSummary from "./pages/Checkout/CheckoutSummary";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AccountOrderList from "./pages/Account/AccountOrderList";
import AccountOrderDetails from "./pages/Account/AccountOrderDetails";
import SecurityForm from "./pages/Account/SecurityForm";
import UserList from "./pages/Dashboard/UserList";
import UserFormCreate from "./pages/Dashboard/UserFormCreate";
import UserFormEdit from "./pages/Dashboard/UserFormEdit";
import ProductList from "./pages/Dashboard/ProductList";
import ProductFormCreate from "./pages/Dashboard/ProductFormCreate";
import ProductFormEdit from "./pages/Dashboard/ProductFormEdit";
import OrderList from "./pages/Dashboard/OrderList";
import OrderDetails from "./pages/Dashboard/OrderDetails";
import ProtectedAccess from "./components/ProtectedAccess";

function App() {
	return (
		<AuthProvider>
			<AuthConsumer>
				{({ user }) => (
					<CartProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Navigate to="/home" />} />
								<Route path="/home" element={<Home />} />
								<Route path="/sign-up" element={<SignUp />} />
								<Route path="/sign-in" element={<SignIn />} />
								<Route path="/sign-out" element={<SignOut />} />
								<Route path="/product" element={<Product />} />
								<Route
									path="/checkout"
									element={
										<ProtectedAccess
											children={
												<CheckoutProvider>
													<Checkout />
												</CheckoutProvider>
											}
											isAllowed={user}
											redirectTo="/sign-in"
										/>
									}
								>
									<Route path="1" element={<CheckoutAddress />} />
									<Route path="2" element={<CheckoutPayment />} />
									<Route path="3" element={<CheckoutSummary />} />
									<Route path="*" element={<Navigate to="1" />} />
								</Route>
								<Route
									path="/account"
									element={<ProtectedAccess children={<Account />} isAllowed={user} redirectTo="/sign-in" />}
								>
									<Route path="security" element={<SecurityForm />} />
									<Route path="orders" element={<AccountOrderList />} />
									<Route path="orders/:numOrder" element={<AccountOrderDetails />} />
								</Route>
								<Route
									path="/dashboard"
									element={
										<ProtectedAccess
											children={<Dashboard />}
											isAllowed={["admin", "main-admin"].includes(user?.role)}
											redirectTo="/home"
										/>
									}
								>
									<Route path="users" element={<UserList />} />
									<Route path="users/:idUser" element={<UserFormEdit />} />
									<Route path="users/new" element={<UserFormCreate />} />
									<Route path="products" element={<ProductList />} />
									<Route path="products/:idProduct" element={<ProductFormEdit />} />
									<Route path="products/new" element={<ProductFormCreate />} />
									<Route path="orders" element={<OrderList />} />
									<Route path="orders/:idOrder" element={<OrderDetails />} />
								</Route>
								<Route path="/product/:idProduct" element={<Product />} />
							</Routes>
						</BrowserRouter>
					</CartProvider>
				)}
			</AuthConsumer>
		</AuthProvider>
	);
}

export default App;
