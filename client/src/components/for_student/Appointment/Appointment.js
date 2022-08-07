// external components
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./Appointment.css";
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";

const Appointment = ({ setSelected }) => {
	// for updating dashboard
	const { setIsSubmitted } = GetContextApi();

	// for get category values
	const [getCateV, setCateV] = useState("");

	// for get file
	const [getFiles, setFiles] = useState("");

	// for get input fields values
	const [getAppointmentV, setAppointmentV] = useState({
		subject: "",
		category: "",
		description: ""
	});

	const { subject, description } = getAppointmentV;

	const onChangeHandler = (event) => {
		setAppointmentV({
			...getAppointmentV,
			[event.target.name]: event.target.value
		});
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		// for submit appointment's information
		try {
			const formData = new FormData();

			for (let i = 0; i < getFiles.length; i++) {
				formData.append("files", getFiles[i]);
			}

			formData.append("subject", subject);
			formData.append("description", description);
			formData.append("category", getCateV);

			const response = await fetch("/appointment", {
				method: "POST",
				body: formData
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 1500
				});

				setTimeout(() => {
					setIsSubmitted(Date.now());
					setSelected("dashboard");
				}, 2500);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}
	};

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
							<CategoryDropdown setCateV={setCateV} getCateV={getCateV} />
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
								handleChange={(files) => setFiles(files)}
								types={[
									"JPEG",
									"JPG",
									"PNG",
									"GIF",
									"PDF",
									"PPT",
									"TXT",
									"DOC",
									"XLS",
									"MP3",
									"MP4",
									"GIF"
								]}
								className="input-field"
							/>
						</div>

						<div className="submit-btn">
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
