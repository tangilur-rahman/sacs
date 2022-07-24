// external components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
