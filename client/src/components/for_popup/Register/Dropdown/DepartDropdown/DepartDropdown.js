// external components
import { useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setGetDepart }) => {
	const [departDrop, setDepartDrop] = useState(false);

	const displayDepartment = () => {
		if (getDepart === "CSS") {
			return "💻  CSS";
		} else if (getDepart === "EEE") {
			return "💡  EEE";
		} else if (getDepart === "TEXTILE") {
			return "🕸️  TEXTILE";
		} else if (getDepart === "B.PHARMACY") {
			return "💊   B.PHARMACY";
		} else if (getDepart === "BBA") {
			return "📈   BBA";
		} else if (getDepart === "LLB") {
			return "⚖️  LLB";
		} else if (getDepart === "English") {
			return "🔤   English";
		} else if (getDepart === "Bangla") {
			return "অ   Bangla";
		}
	};
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
					value={displayDepartment()}
					required
				/>
				<div className="option">
					<div onClick={() => setGetDepart("CSS")}>
						<span>💻 &nbsp;CSS</span>
					</div>

					<div onClick={() => setGetDepart("EEE")}>
						<span>💡 &nbsp;EEE</span>
					</div>

					<div onClick={() => setGetDepart("TEXTILE")}>
						<span>🕸️ &nbsp;TEXTILE</span>
					</div>

					<div onClick={() => setGetDepart("B.PHARMACY")}>
						<span>💊 &nbsp; B.PHARMACY</span>
					</div>

					<div onClick={() => setGetDepart("BBA")}>
						<span>📈 &nbsp; BBA</span>
					</div>

					<div onClick={() => setGetDepart("LLB")}>
						<span>⚖️&nbsp; LLB</span>
					</div>

					<div onClick={() => setGetDepart("English")}>
						<span>🔤 &nbsp; English</span>
					</div>

					<div onClick={() => setGetDepart("Bangla")}>
						<span>অ &nbsp; Bangla</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartDropdown;
