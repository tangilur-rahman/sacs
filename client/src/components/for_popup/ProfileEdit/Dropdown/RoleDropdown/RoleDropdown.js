// external components
import { useState } from "react";

// internal components
import "./RoleDropdown.css";

const RoleDropdown = ({ getRole, setRole }) => {
	const [roleDrop, setRoleDrop] = useState(false);

	const displayRole = () => {
		if (getRole === "advisor") {
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
					<div onClick={() => setRole("advisor")}>
						<div>🤵 &nbsp;Advisor</div>
					</div>
					<div onClick={() => setRole("student")}>
						<div>👨‍🎓 &nbsp;Student</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoleDropdown;
