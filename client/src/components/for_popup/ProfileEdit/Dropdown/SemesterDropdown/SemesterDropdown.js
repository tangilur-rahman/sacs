// external components
import { useState } from "react";

// internal components
import "./SemesterDropdown.css";

const SemesterDropDown = ({ getSemester, setSemester }) => {
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
					<div onClick={() => setSemester("1st")}>
						<span>1st</span>
					</div>
					<div onClick={() => setSemester("2nd")}>
						<span>2nd</span>
					</div>

					<div onClick={() => setSemester("3rd")}>
						<span>3rd</span>
					</div>

					<div onClick={() => setSemester("4rd")}>
						<span>4rd</span>
					</div>

					<div onClick={() => setSemester("5rd")}>
						<span>5rd</span>
					</div>

					<div onClick={() => setSemester("6rd")}>
						<span>6rd</span>
					</div>

					<div onClick={() => setSemester("7rd")}>
						<span>7rd</span>
					</div>

					<div onClick={() => setSemester("8rd")}>
						<span>8rd</span>
					</div>

					<div onClick={() => setSemester("9rd")}>
						<span>9rd</span>
					</div>

					<div onClick={() => setSemester("10rd")}>
						<span>10rd</span>
					</div>

					<div onClick={() => setSemester("11rd")}>
						<span>11rd</span>
					</div>

					<div onClick={() => setSemester("12rd")}>
						<span>12rd</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default SemesterDropDown;
