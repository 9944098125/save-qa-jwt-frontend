import React from "react";
import "./App.css";
import BaseRoutes from "./Routing/BaseRoutes";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<React.Fragment>
			<BaseRoutes />
			<Toaster />
		</React.Fragment>
	);
}

export default App;
