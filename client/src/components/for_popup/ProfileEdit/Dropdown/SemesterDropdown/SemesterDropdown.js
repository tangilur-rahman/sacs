// external components
import { useState } from "react";

// internal components
import "./SemesterDropdown.css";

const SemesterDropDown = ({ getSemester, setSemester, editT }) => {
	const [semesterDrop, setSemesterDrop] = useState(false);
	return (
		<>
			{!editT ? (
				<input value={getSemester} style={{ textAlign: "start" }} readOnly />
			) : (
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
						<div onClick={() => setSemester("1st")}>
							<div>1st</div>
						</div>
						<div onClick={() => setSemester("2nd")}>
							<div>2nd</div>
						</div>

						<div onClick={() => setSemester("3rd")}>
							<div>3rd</div>
						</div>

						<div onClick={() => setSemester("4rd")}>
							<div>4rd</div>
						</div>

						<div onClick={() => setSemester("5rd")}>
							<div>5rd</div>
						</div>

						<div onClick={() => setSemester("6rd")}>
							<div>6rd</div>
						</div>

						<div onClick={() => setSemester("7rd")}>
							<div>7rd</div>
						</div>

						<div onClick={() => setSemester("8rd")}>
							<div>8rd</div>
						</div>

						<div onClick={() => setSemester("9rd")}>
							<div>9rd</div>
						</div>

						<div onClick={() => setSemester("10rd")}>
							<div>10rd</div>
						</div>

						<div onClick={() => setSemester("11rd")}>
							<div>11rd</div>
						</div>

						<div onClick={() => setSemester("12rd")}>
							<div>12rd</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SemesterDropDown;
