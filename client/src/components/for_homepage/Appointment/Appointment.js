// external components
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FileUploader } from "react-drag-drop-files";

// internal components
import "./Appointment.css";
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";

const Appointment = () => {
	// for get category values
	const [getCateV, setCateV] = useState("");

	// for get file
	const [getFile, setFile] = useState("");

	// for get input fields values
	const [getAppointmentV, setAppointmentV] = useState({
		subject: "",
		category: "",
		description: "",
		attachment: []
	});

	const { subject, category, description } = getAppointmentV;

	const onChangeHandler = (event) => {
		setAppointmentV({
			...getAppointmentV,
			[event.target.name]: event.target.value
		});
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
	};

	console.log(getFile);

	return (
		<>
			<div className="c-appointment-container">
				<h5>Create Appointment</h5>
				<div className="input-box">
					<form>
						<div className="division">
							<label htmlFor="subject">Subject : </label>

							<input
								type="text"
								id="subject"
								name="subject"
								autoFocus
								onChange={onChangeHandler}
								value={subject}
								className="input-field"
							/>
						</div>

						<div className="division">
							<label htmlFor="category">Category : </label>
							<CategoryDropdown
								setCateV={setCateV}
								category={category}
								getCateV={getCateV}
							/>
						</div>

						<div className="division">
							<label htmlFor="description">Description : </label>
							<TextareaAutosize
								id="description"
								name="description"
								placeholder="Write..."
								onChange={onChangeHandler}
								value={description}
								className="input-field"
								minRows={4}
							/>
						</div>

						<div className="division">
							<label htmlFor="attachment">Attachment : </label>
							<FileUploader
								label="Upload or drop a file here..."
								multiple={true}
								name="file"
								handleChange={(file) => setFile(file)}
								types={[
									"JPEG",
									"JPG",
									"PNG",
									"GIF",
									"PDF",
									"PPT",
									"PPTX",
									"TXT",
									"DOC",
									"DOCX",
									"XLSX",
									"XLS"
								]}
								className="input-field"
							/>
						</div>

						<div className="btn-container">
							<button
								className="btn btn-success btn-style"
								onClick={onSubmitHandler}
							>
								Sumit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Appointment;
