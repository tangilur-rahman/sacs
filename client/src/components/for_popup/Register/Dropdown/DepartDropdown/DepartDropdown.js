// external components
import { useState } from "react";

// internal components
import "./DepartDropdown.css";

const DepartDropdown = ({ getDepart, setDepart }) => {
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
					<div onClick={() => setDepart("css")}>
						<span>💻 &nbsp;CSE</span>
					</div>

					<div onClick={() => setDepart("eee")}>
						<span>💡 &nbsp;EEE</span>
					</div>

					<div onClick={() => setDepart("textile")}>
						<span>🕸️ &nbsp;TEXTILE</span>
					</div>

					<div onClick={() => setDepart("pharmacy")}>
						<span>💊 &nbsp; B.PHARMACY</span>
					</div>

					<div onClick={() => setDepart("bba")}>
						<span>📈 &nbsp; BBA</span>
					</div>

					<div onClick={() => setDepart("llb")}>
						<span>⚖️&nbsp; LLB</span>
					</div>

					<div onClick={() => setDepart("english")}>
						<span>🔤 &nbsp; English</span>
					</div>

					<div onClick={() => setDepart("bangla")}>
						<span>অ &nbsp; Bangla</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartDropdown;
