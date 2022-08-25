// external components
import { useState } from "react";
import sortArray from "sort-array";

// internal components
import "./AdvisorDropdown.css";

const AdvisorDropdown = ({
	getAdvisor,
	setAdvisor,
	editT,
	getAdvisorArray
}) => {
	const [advisorDropT, setAdvisorDropT] = useState(false);

	const displayDepartment = () => {
		if (getAdvisor.gender === "male") {
			return "🙍‍♂️ " + getAdvisor.name;
		} else if (
			getAdvisor.gender === "female" ||
			getAdvisor.gender === "other"
		) {
			return "🙎‍♀️ " + getAdvisor.name;
		}
	};

	return (
		<>
			{!editT ? (
				<input
					value={getAdvisor.name}
					style={{
						textAlign: "start",
						maxWidth: "200px"
					}}
					readOnly
				/>
			) : (
				<div
					className={
						advisorDropT ? "advisor-container active" : "advisor-container"
					}
					onClick={() => setAdvisorDropT(!advisorDropT)}
				>
					<input
						type="text"
						placeholder="Select Advisor"
						readOnly
						value={displayDepartment()}
						required
					/>
					<div className="option">
						{getAdvisorArray &&
							sortArray(getAdvisorArray, {
								by: "updatedAt",
								order: "desc"
							}).map((value, index) => {
								return (
									<div
										onClick={() =>
											setAdvisor({
												_id: value._id,
												name: value.name,
												gender: value.gender
											})
										}
										key={index}
									>
										<div>{value.name}</div>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default AdvisorDropdown;
