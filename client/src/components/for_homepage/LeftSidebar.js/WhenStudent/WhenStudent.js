import "./WhenStudent.css";

const WhenStudent = ({ selected, setSelected }) => {
	return (
		<>
			<span
				onClick={() => setSelected("dashboard")}
				className={selected === "dashboard" ? "dashboard-active" : ""}
			>
				<i className="bi bi-journal-medical"></i>
				<h5>Dashboard</h5>
			</span>

			<span
				onClick={() => setSelected("chat")}
				className={selected === "chat" ? "group-chat-active" : ""}
			>
				<i className="fa-solid fa-comments"></i>
				<h5>Chat</h5>
			</span>

			<span
				onClick={() => setSelected("appointment")}
				className={selected === "appointment" ? "appointment-active" : ""}
			>
				<i className="fa-solid fa-user-tie"></i>
				<h5>Appointment</h5>
			</span>

			<span
				onClick={() => setSelected("instructor")}
				className={selected === "instructor" ? "instructor-active" : ""}
			>
				<i className="bi bi-calendar2-check"></i>
				<h5>My Advisor</h5>
			</span>
		</>
	);
};

export default WhenStudent;
