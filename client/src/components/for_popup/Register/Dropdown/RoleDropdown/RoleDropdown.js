// external components
import { useState } from "react";

// internal components
import "./RoleDropdown.css";

const RoleDropdown = ({ getRole, setRole }) => {
	const [roleDrop, setRoleDrop] = useState(false);

	const displayRole = () => {
		if (getRole === "administrator") {
			return "🏫  Administrator";
		} else if (getRole === "advisor") {
			return "🤵  Advisor";
		} else if (getRole === "student") {
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
					<div onClick={() => setRole("administrator")}>
						<span>🏫 &nbsp;Administrator</span>
					</div>
					<div onClick={() => setRole("advisor")}>
						<span>🤵 &nbsp;Advisor</span>
					</div>
					<div onClick={() => setRole("student")}>
						<span>👨‍🎓 &nbsp;Student</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoleDropdown;
