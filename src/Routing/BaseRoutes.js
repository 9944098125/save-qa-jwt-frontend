import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar";
import Create from "../Pages/Create";
import Registration from "../Pages/Registration";

const Layout = () => {
	return (
		<div>
			<Navbar />
			<div className="outlet">
				<Outlet />
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/registration",
		element: <Registration />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/create",
				element: <Create />,
			},
		],
	},
]);

export default function BaseRoutes() {
	return <RouterProvider router={router} />;
}
