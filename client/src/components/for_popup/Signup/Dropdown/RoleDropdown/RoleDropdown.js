// external components
import React, { useState } from "react";

// internal components
import "./RoleDropdown.css";

const RoleDropdown = () => {
	const [getRole, setGetRole] = useState("");
	const [roleDrop, setRoleDrop] = useState(false);

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
					value={getRole}
					required
				/>
				<div className="option">
					<div onClick={() => setGetRole("🏫  Administrator")}>
						<span>🏫 &nbsp;Administrator</span>
					</div>
					<div onClick={() => setGetRole("🤵  Instructor")}>
						<span>🤵 &nbsp;Instructor</span>
					</div>
					<div onClick={() => setGetRole("👨‍🎓  Student")}>
						<span>👨‍🎓 &nbsp;Student</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoleDropdown;
