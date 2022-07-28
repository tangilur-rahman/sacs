// external components
import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal components
import "./App.css";

// pages
import Error from "./components/Error/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
