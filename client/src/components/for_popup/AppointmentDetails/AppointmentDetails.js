// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

// internal components
import "./AppointmentDetails.css";

const AppointmentDetails = ({ appDisplay, setAppDisplay }) => {
	// for outside click to close
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setAppDisplay(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appDisplay]);

	// fetch appointment-details

	const [specificApp, setSpecificApp] = useState("");

	const getSpecificApp = async () => {
		try {
			const response = await fetch(`/appointment/${appDisplay}`);

			const result = await response.json();

			if (response.status === 200) {
				setSpecificApp(result);
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

	useEffect(() => {
		getSpecificApp();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appDisplay]);

	return (
		<>
			<div className="appointment-details-container">
				<div className="row m-0 layout-center">
					<div className="col-8 p-0">
						<div ref={myRef} className="appointment-details">
							<h3>{specificApp.subject}</h3>
							<div>
								<span>Category&nbsp;:</span>
								<p>{specificApp.category}</p>
							</div>
							<div className="for-margin">
								<span>Description&nbsp;:</span>
								<p>{specificApp.description}</p>
							</div>
							<div className="for-margin">
								<span>Date&nbsp;:</span>
								<p>
									{moment(specificApp.createAt).format("h:mm A - MMMM d, YYYY")}
								</p>
							</div>

							<div className="for-margin">
								<span>Attachment&nbsp;:</span>
								{specificApp.attachments &&
									specificApp.attachments.map((value, index) => {
										return (
											<a href={value} download key={index}>
												{value}
											</a>
										);
									})}
							</div>

							<span className="icon" onClick={() => setAppDisplay(false)}>
								<i className="fa-solid fa-circle-xmark"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppointmentDetails;
