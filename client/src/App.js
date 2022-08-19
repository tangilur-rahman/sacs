// external components
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal components
import "./App.css";
import AdvisorInfo from "./components/for_student/AdvisorInfo/AdvisorInfo";
import Appointment from "./components/for_student/Appointment/Appointment";
import Chat from "./components/for_student/Chat/Chat";
import Dashboard from "./components/for_student/Dashboard/Dashboard";

// pages
import Error from "./components/Error/Error";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

const App = () => {
	// for get selected value from left-sidebar
	const [selected, setSelected] = useState("dashboard");

	// for appointment-details popup toggle
	const [appDisplay, setAppDisplay] = useState(false);

	// for get message id from notification
	const [messageId, setMessageId] = useState("");

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Homepage
								selected={selected}
								setSelected={setSelected}
								appDisplay={appDisplay}
								setAppDisplay={setAppDisplay}
								setMessageId={setMessageId}
							/>
						}
					>
						<Route
							path="dashboard"
							element={
								<Dashboard
									setSelected={setSelected}
									setAppDisplay={setAppDisplay}
								/>
							}
						/>
						<Route path="chat" element={<Chat messageId={messageId} />} />
						<Route
							path="create-appointment"
							element={<Appointment setSelected={setSelected} />}
						/>
						<Route path="my-advisor" element={<AdvisorInfo />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
