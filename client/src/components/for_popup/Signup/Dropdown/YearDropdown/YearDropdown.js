// external components
import { useState } from "react";
import YearPicker from "react-year-picker";

// internal components
import "./YearDropdown.css";

const YearDropdown = () => {
	const [year, setYear] = useState("");

	return (
		<>
			<div className="year-container">
				<YearPicker onChange={(date) => setYear(date)} />
			</div>
		</>
	);
};

export default YearDropdown;
