// external components
import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal components
import "./App.css";

// pages
import Error from "./components/Error/Error";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />}>
						<Route path="dashboard" element={"dashboard"} />
						<Route path="chat" element={"chat"} />
						<Route path="create-appointment" element={"appointment"} />
						<Route path="my-instructor" element={"my-instructor"} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
