// external components
import { useState } from "react";

// internal components
import "./GroupDropdown.css";

const GroupDropdown = ({ getGroup, setGroup }) => {
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
					<div onClick={() => setGroup("A")}>
						<span>
							<i className="fa-solid fa-a"></i>
						</span>
					</div>
					<div onClick={() => setGroup("B")}>
						<span>
							<i className="fa-solid fa-b"></i>
						</span>
					</div>

					<div onClick={() => setGroup("C")}>
						<span>
							<i className="fa-solid fa-c"></i>
						</span>
					</div>

					<div onClick={() => setGroup("D")}>
						<span>
							<i className="fa-solid fa-d"></i>
						</span>
					</div>

					<div onClick={() => setGroup("E")}>
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
