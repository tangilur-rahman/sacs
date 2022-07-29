//external components
import { useEffect } from "react";

// internal components
import "./LeftSidebar.css";
import WhenAdministrator from "./WhenAdministrator/WhenAdministrator";
import WhenInstructor from "./WhenInstructor/WhenInstructor";
import WhenStudent from "./WhenStudent/WhenStudent";

const LeftSidebar = ({ currentUser, selected, setSelected }) => {
	// for set initial-value
	useEffect(() => {
		if (currentUser.role === "Administrator") {
			setSelected("");
		} else if (currentUser.role === "Instructor") {
			setSelected("");
		} else if (currentUser.role === "Student") {
			setSelected("dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return (
		<>
			<div className="current-user">
				<img
					src="/assets/profile/tangil.png"
					alt="profile-img"
					className="img-fluid"
				/>
				<div className="info">
					<h4>{"Tangilur Rahman"}</h4>
					<div>
						<h6>ID :</h6> <span>{currentUser.id}</span>
					</div>
				</div>
			</div>

			<div className="tab-container">
				{currentUser.role === "Administrator" && (
					<WhenAdministrator selected={selected} setSelected={setSelected} />
				)}

				{currentUser.role === "Instructor" && (
					<WhenInstructor selected={selected} setSelected={setSelected} />
				)}

				{currentUser.role === "Student" && (
					<WhenStudent selected={selected} setSelected={setSelected} />
				)}
			</div>
		</>
	);
};

export default LeftSidebar;
