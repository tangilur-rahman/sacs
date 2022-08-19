// external components
import DatePicker from "react-date-picker";

// internal components
import "./YearDropdown.css";

const YearDropdown = ({ year, setYear }) => {
	return (
		<>
			<div className="year-container">
				<DatePicker
					maxDetail="decade"
					onChange={(date) => setYear(date)}
					value={year}
				/>
			</div>
		</>
	);
};

export default YearDropdown;
