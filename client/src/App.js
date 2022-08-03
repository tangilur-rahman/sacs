// external components
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal components
import "./App.css";
import Appointment from "./components/for_student/Appointment/Appointment";
import Dashboard from "./components/for_student/Dashboard/Dashboard";
import Chat from "./components/for_student/Chat/Chat";
import AdvisorInfo from "./components/for_student/AdvisorInfo/AdvisorInfo";

// pages
import Error from "./components/Error/Error";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

const App = () => {
	// for get selected value from left-sidebar
	const [selected, setSelected] = useState("");

	const [appointmentT, setAppointmentT] = useState(false);

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
								appointmentT={appointmentT}
								setAppointmentT={setAppointmentT}
							/>
						}
					>
						<Route
							path="dashboard"
							element={
								<Dashboard
									setSelected={setSelected}
									setAppointmentT={setAppointmentT}
								/>
							}
						/>
						<Route path="chat" element={<Chat />} />
						<Route path="create-appointment" element={<Appointment />} />
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
