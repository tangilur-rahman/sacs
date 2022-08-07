import "./TabContainer.css";

const WhenStudent = ({ selected, setSelected, currentUser }) => {
	return (
		<>
			{/* dashboard start  */}
			<span
				onClick={() => setSelected("dashboard")}
				className={selected === "dashboard" ? "dashboard-active" : ""}
			>
				<i className="bi bi-journal-medical"></i>
				<h5>Dashboard</h5>
			</span>
			{/* dashboard end  */}

			{/* chat start  */}
			<span
				onClick={() => setSelected("chat")}
				className={selected === "chat" ? "group-chat-active" : ""}
			>
				<i className="fa-solid fa-comments"></i>
				<h5>Chat</h5>
			</span>
			{/* chat end  */}

			{/* create appointment start  */}
			{currentUser.role === "student" && (
				<span
					onClick={() => setSelected("appointment")}
					className={selected === "appointment" ? "appointment-active" : ""}
				>
					<i className="fa-solid fa-user-tie"></i>
					<h5>Appointment</h5>
				</span>
			)}

			{/* create appointment end  */}

			{/* advisor-profile start  */}
			{currentUser.role === "student" && (
				<span
					onClick={() => setSelected("advisor")}
					className={selected === "advisor" ? "advisor-active" : ""}
				>
					<i className="bi bi-calendar2-check"></i>
					<h5>My Advisor</h5>
				</span>
			)}

			{/* advisor-profile end  */}
		</>
	);
};

export default WhenStudent;
