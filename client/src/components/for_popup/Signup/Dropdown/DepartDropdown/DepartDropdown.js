// external components
import React, { useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = () => {
	const [getDepart, setGetDepart] = useState("");
	const [departDrop, setDepartDrop] = useState(false);
	return (
		<>
			<div
				className={departDrop ? "depart-container active" : "depart-container"}
				onClick={() => setDepartDrop(!departDrop)}
			>
				<input
					type="text"
					placeholder="Select Department"
					readOnly
					value={getDepart}
					required
				/>
				<div className="option">
					<div onClick={() => setGetDepart("💻  CSS")}>
						<span>
							<i className="fa-solid fa-code"></i> &nbsp;CSS
						</span>
					</div>

					<div onClick={() => setGetDepart("💡  EEE")}>
						<span>💡 &nbsp;EEE</span>
					</div>

					<div onClick={() => setGetDepart("🕸️  TEXTILE")}>
						<span>🕸️ &nbsp;TEXTILE</span>
					</div>

					<div onClick={() => setGetDepart("💊   B.PHARMACY")}>
						<span>💊 &nbsp; B.PHARMACY</span>
					</div>

					<div onClick={() => setGetDepart("📈   BBA")}>
						<span>📈 &nbsp; BBA</span>
					</div>

					<div onClick={() => setGetDepart("অ   Bangla")}>
						<span>অ &nbsp; Bangla</span>
					</div>

					<div onClick={() => setGetDepart("🔤   English")}>
						<span>🔤 &nbsp; English</span>
					</div>

					<div onClick={() => setGetDepart("⚖️  LLB")}>
						<span>⚖️&nbsp; LLB</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartDropdown;
