// external components
import YearPicker from "react-year-picker";

// internal components
import "./YearDropdown.css";

const YearDropdown = ({ setYear }) => {
	return (
		<>
			<div className="year-container">
				<YearPicker onChange={(date) => setYear(date)} />
			</div>
		</>
	);
};

export default YearDropdown;
