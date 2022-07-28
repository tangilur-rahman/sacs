// external components
import React, { useState } from "react";

// internal components
import "./GroupDropdown.css";

const GroupDropdown = ({ getGroup, setGetGroup }) => {
	const [groupDrop, setGroupDrop] = useState(false);
	return (
		<>
			<div
				className={groupDrop ? "group-container active" : "group-container"}
				onClick={() => setGroupDrop(!groupDrop)}
			>
				<input
					type="text"
					placeholder="Select Group"
					readOnly
					value={getGroup}
					required
				/>
				<div className="option">
					<div onClick={() => setGetGroup("A")}>
						<span>
							<i class="fa-solid fa-a"></i>
						</span>
					</div>
					<div onClick={() => setGetGroup("B")}>
						<span>
							<i class="fa-solid fa-b"></i>
						</span>
					</div>

					<div onClick={() => setGetGroup("C")}>
						<span>
							<i className="fa-solid fa-c"></i>
						</span>
					</div>

					<div onClick={() => setGetGroup("D")}>
						<span>
							<i className="fa-solid fa-d"></i>
						</span>
					</div>

					<div onClick={() => setGetGroup("E")}>
						<span>
							<i className="fa-solid fa-e"></i>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupDropdown;
