// external components
import { useState } from "react";

// internal components
import "./GenderDropdown.css";

const GenderDropdown = ({ getGender, setGender }) => {
	const [genderDrop, setGenderDrop] = useState(false);

	const displayGender = () => {
		if (getGender === "male") {
			return "👨‍🦰  Male";
		} else if (getGender === "female") {
			return "👩‍🦰  Female";
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
					placeholder="Select Gender"
					readOnly
					value={displayGender()}
					required
				/>
				<div className="option">
					<div onClick={() => setGender("male")}>
						<div>👨‍🦰 &nbsp; Male</div>
					</div>
					<div onClick={() => setGender("female")}>
						<div>👩‍🦰 &nbsp; Female</div>
					</div>

					<div onClick={() => setGender("other")}>
						<div>&nbsp; ⚨ &nbsp; Other</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GenderDropdown;
