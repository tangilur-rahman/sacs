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
		if (currentUser.role === "administrator") {
			setSelected("");
		} else if (currentUser.role === "advisor") {
			setSelected("");
		} else if (currentUser.role === "student") {
			setSelected("dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return (
		<>
			<div className="current-user">
				<img
					src={`uploads/profile-img/${currentUser.profile_img}`}
					alt="profile-img"
					className="img-fluid"
				/>
				<div className="info">
					<h4>{currentUser.name}</h4>
					<div>
						<h6>ID :</h6> <span>{currentUser.id}</span>
					</div>
				</div>
			</div>

			<div className="tab-container">
				{currentUser.role === "administrator" && (
					<WhenAdministrator selected={selected} setSelected={setSelected} />
				)}

				{currentUser.role === "instructor" && (
					<WhenInstructor selected={selected} setSelected={setSelected} />
				)}

				{currentUser.role === "student" && (
					<WhenStudent selected={selected} setSelected={setSelected} />
				)}
			</div>
		</>
	);
};

export default LeftSidebar;
