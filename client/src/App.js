// external components
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// internal components
import "./App.css";
import Appointment from "./components/for_homepage/Appointment/Appointment";
import Dashboard from "./components/for_homepage/Dashboard/Dashboard";
import GroupChat from "./components/for_homepage/GroupChat/GroupChat";
import InstructorInfo from "./components/for_homepage/InstructorInfo/InstructorInfo";

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
						<Route path="chat" element={<GroupChat />} />
						<Route path="create-appointment" element={<Appointment />} />
						<Route path="my-instructor" element={<InstructorInfo />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
