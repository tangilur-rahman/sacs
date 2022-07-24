//external components
import { useState } from "react";

// internal components
import { current_user } from "./../../../dummy_data";
import "./Left.css";

const Left = () => {
	const [administrator, setAdministrator] = useState(true);
	const [instructor, setInstructor] = useState(false);
	const [student, setStudent] = useState(false);

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
				<img src={current_user.img} alt="profile-img" className="profile-img" />
				<div className="info">
					<h4>{current_user.name}</h4>
					<h6>role :</h6> <span>{current_user.role}</span>
				</div>
			</div>

			<div className="other-user">
				<span
					onClick={administrator_handler}
					className={administrator ? "administrator-active" : null}
				>
					<i className="fa-solid fa-building-columns"></i>
					<h5>Administrator</h5>
				</span>

				<span
					onClick={instructor_handler}
					className={instructor ? "instructor-active" : null}
				>
					<i className="fa-solid fa-user-graduate"></i>
					<h5>Instructor</h5>
				</span>

				<span
					onClick={student_handler}
					className={student ? "student-active" : null}
				>
					<i className="bi bi-person-workspace"></i>
					<h5>Students</h5>
				</span>
			</div>
		</>
	);
};

export default Left;
