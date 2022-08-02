// external components
import { useState } from "react";

// internal components
import "./GenderDropdown.css";

const GenderDropdown = ({ getGender, setGender }) => {
	const [genderDrop, setGenderDrop] = useState(false);

	const displayGender = () => {
		if (getGender === "male") {
			return "👨‍🦰 Male";
		} else if (getGender === "female") {
			return "👩‍🦰 Female";
		} else if (getGender === "other") {
			return "⚨  Other";
		}
	};

	return (
		<>
			<div
				className={genderDrop ? "gender-container active" : "gender-container"}
				onClick={() => setGenderDrop(!genderDrop)}
			>
				<input
					type="text"
					placeholder="Select Group"
					readOnly
					value={displayGender()}
					required
				/>
				<div className="option">
					<div onClick={() => setGender("male")}>
						<span>👨‍🦰 &nbsp; Male</span>
					</div>
					<div onClick={() => setGender("female")}>
						<span>👩‍🦰 &nbsp; Female</span>
					</div>

					<div onClick={() => setGender("other")}>
						<span>&nbsp; ⚨ &nbsp; Other</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default GenderDropdown;
