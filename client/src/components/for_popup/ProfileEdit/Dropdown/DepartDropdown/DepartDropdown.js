// external components
import { useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setDepart, editT }) => {
	const [departDrop, setDepartDrop] = useState(false);

	const displayDepartment = () => {
		if (getDepart === "cse") {
			return "💻  CSE";
		} else if (getDepart === "eee") {
			return "💡  EEE";
		} else if (getDepart === "textile") {
			return "🕸️  TEXTILE";
		} else if (getDepart === "pharmacy") {
			return "💊   B.PHARMACY";
		} else if (getDepart === "bba") {
			return "📈   BBA";
		} else if (getDepart === "llb") {
			return "⚖️  LLB";
		} else if (getDepart === "english") {
			return "🔤   English";
		} else if (getDepart === "bangla") {
			return "অ   Bangla";
		}
	};
	return (
		<>
			{!editT ? (
				<input value={getDepart} style={{ textAlign: "start" }} readOnly />
			) : (
				<div
					className={
						departDrop ? "depart-container active" : "depart-container"
					}
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
						<div onClick={() => setDepart("css")}>
							<div>💻 &nbsp;CSE</div>
						</div>

						<div onClick={() => setDepart("eee")}>
							<div>💡 &nbsp;EEE</div>
						</div>

						<div onClick={() => setDepart("textile")}>
							<div>🕸️ &nbsp;TEXTILE</div>
						</div>

						<div onClick={() => setDepart("pharmacy")}>
							<div>💊 &nbsp; B.PHARMACY</div>
						</div>

						<div onClick={() => setDepart("bba")}>
							<div>📈 &nbsp; BBA</div>
						</div>

						<div onClick={() => setDepart("llb")}>
							<div>⚖️&nbsp; LLB</div>
						</div>

						<div onClick={() => setDepart("english")}>
							<div>🔤 &nbsp; English</div>
						</div>

						<div onClick={() => setDepart("bangla")}>
							<div>অ &nbsp; Bangla</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DepartDropdown;
