// external components
import { useState } from "react";

// internal components
import "./RoleDropdown.css";

const RoleDropdown = ({ getRole, setGetRole }) => {
	const [roleDrop, setRoleDrop] = useState(false);

	const displayRole = () => {
		if (getRole === "Administrator") {
			return "🏫  Administrator";
		} else if (getRole === "Instructor") {
			return "🤵  Instructor";
		} else if (getRole === "Student") {
			return "👨‍🎓  Student";
		}
	};

	return (
		<>
			<div
				className={roleDrop ? "role-container active" : "role-container"}
				onClick={() => setRoleDrop(!roleDrop)}
			>
				<input
					type="text"
					placeholder="Select Role"
					readOnly
					value={displayRole()}
					required
				/>
				<div className="option">
					<div onClick={() => setGetRole("Administrator")}>
						<span>🏫 &nbsp;Administrator</span>
					</div>
					<div onClick={() => setGetRole("Instructor")}>
						<span>🤵 &nbsp;Instructor</span>
					</div>
					<div onClick={() => setGetRole("Student")}>
						<span>👨‍🎓 &nbsp;Student</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoleDropdown;
