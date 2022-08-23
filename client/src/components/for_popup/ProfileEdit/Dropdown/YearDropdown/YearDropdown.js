// external components
import DatePicker from "react-date-picker";

// internal components
import "./YearDropdown.css";

const YearDropdown = ({ getYear, setYear, editT }) => {
	return (
		<>
			<div className="year-container">
				{!editT ? (
					<input
						value={new Date(getYear).getFullYear()}
						style={{ textAlign: "start" }}
						readOnly
					/>
				) : (
					<DatePicker
						maxDetail="decade"
						onChange={(date) => setYear(date)}
						value={getYear}
					/>
				)}
			</div>
		</>
	);
};

export default YearDropdown;
