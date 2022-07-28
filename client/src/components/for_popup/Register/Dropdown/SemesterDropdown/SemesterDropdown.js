// external components
import React, { useState } from "react";

// internal components
import "./SemesterDropdown.css";

const SemesterDropDown = ({ getSemester, setGetSemester }) => {
	const [semesterDrop, setSemesterDrop] = useState(false);
	return (
		<>
			<div
				className={
					semesterDrop ? "semester-container active" : "semester-container"
				}
				onClick={() => setSemesterDrop(!semesterDrop)}
			>
				<input
					type="text"
					placeholder="Select Semester"
					readOnly
					value={getSemester}
					required
				/>
				<div className="option">
					<div onClick={() => setGetSemester("1st")}>
						<span>1st</span>
					</div>
					<div onClick={() => setGetSemester("2nd")}>
						<span>2nd</span>
					</div>

					<div onClick={() => setGetSemester("3rd")}>
						<span>3rd</span>
					</div>

					<div onClick={() => setGetSemester("4rd")}>
						<span>4rd</span>
					</div>

					<div onClick={() => setGetSemester("5rd")}>
						<span>5rd</span>
					</div>

					<div onClick={() => setGetSemester("6rd")}>
						<span>6rd</span>
					</div>

					<div onClick={() => setGetSemester("7rd")}>
						<span>7rd</span>
					</div>

					<div onClick={() => setGetSemester("8rd")}>
						<span>8rd</span>
					</div>

					<div onClick={() => setGetSemester("9rd")}>
						<span>9rd</span>
					</div>

					<div onClick={() => setGetSemester("10rd")}>
						<span>10rd</span>
					</div>

					<div onClick={() => setGetSemester("11rd")}>
						<span>11rd</span>
					</div>

					<div onClick={() => setGetSemester("12rd")}>
						<span>12rd</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default SemesterDropDown;
