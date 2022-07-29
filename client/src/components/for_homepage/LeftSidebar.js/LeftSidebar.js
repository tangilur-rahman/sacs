//external components
import { useEffect, useState } from "react";

// internal components
import "./LeftSidebar.css";

const LeftSidebar = ({ currentUser }) => {
	const [administrator, setAdministrator] = useState(true);
	const [instructor, setInstructor] = useState(false);
	const [student, setStudent] = useState(false);

	useEffect(() => {
		if (currentUser.role === "Administrator") {
			setInstructor(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const administrator_handler = () => {
		setAdministrator(true);
		setInstructor(false);
		setStudent(false);
	};

	const instructor_handler = () => {
		setAdministrator(false);
		setInstructor(true);
		setStudent(false);
	};

	const student_handler = () => {
		setAdministrator(false);
		setInstructor(false);
		setStudent(true);
	};

	return (
		<>
			<div className="current-user">
				<img
					src={currentUser.profile_img}
					alt="profile-img"
					className="profile-img img-fluid"
				/>
				<div className="info">
					<h4>{currentUser.name}</h4>
					<h6>role :</h6> <span>{currentUser.role}</span>
				</div>
			</div>

			<div className="other-user">
				{currentUser.role !== "Administrator" && (
					<span
						onClick={administrator_handler}
						className={administrator ? "administrator-active" : null}
					>
						<i className="fa-solid fa-building-columns"></i>
						<h5>Administrator</h5>
					</span>
				)}

				{currentUser.role !== "Instructor" && (
					<span
						onClick={instructor_handler}
						className={instructor ? "instructor-active" : null}
					>
						<i className="fa-solid fa-user-tie"></i>
						<h5>Instructor</h5>
					</span>
				)}

				{currentUser.role !== "Student" && (
					<span
						onClick={student_handler}
						className={student ? "student-active" : null}
					>
						<i className="bi bi-person-workspace"></i>
						<h5>Students</h5>
					</span>
				)}
			</div>
		</>
	);
};

export default LeftSidebar;
