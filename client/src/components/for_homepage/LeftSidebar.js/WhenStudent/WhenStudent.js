import "./WhenStudent.css";

const WhenStudent = ({ selected, setSelected }) => {
	console.log("i" + selected);

	return (
		<>
			<span
				onClick={() => setSelected("dashboard")}
				className={selected === "dashboard" && "dashboard-active"}
			>
				<i className="bi bi-journal-medical"></i>
				<h5>Dashboard</h5>
			</span>

			<span
				onClick={() => setSelected("group-chat")}
				className={selected === "group-chat" && "group-chat-active"}
			>
				<i className="fa-solid fa-comments"></i>
				<h5>Group Chat</h5>
			</span>

			<span
				onClick={() => setSelected("appointment")}
				className={selected === "appointment" && "appointment-active"}
			>
				<i className="fa-solid fa-user-tie"></i>
				<h5>Appointment</h5>
			</span>

			<span
				onClick={() => setSelected("instructor")}
				className={selected === "instructor" && "instructor-active"}
			>
				<i className="bi bi-calendar2-check"></i>
				<h5>My Instructor</h5>
			</span>
		</>
	);
};

export default WhenStudent;
