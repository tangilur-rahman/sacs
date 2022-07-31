// external components
import { useEffect, useRef } from "react";

// internal components
import "./AppointmentDetails.css";

const AppointmentDetails = ({ appointmentT, setAppointmentT }) => {
	// for outside click to close
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setAppointmentT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appointmentT]);

	return (
		<>
			<div className="appointment-details-container">
				<div className="row m-0 layout-center">
					<div className="col-8 p-0">
						<div ref={myRef} className="appointment-details">
							<h3>{appointmentT}</h3>
							<div>
								<span>Category&nbsp;:</span>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
									blanditiis assumenda similique non illo dolores magnam,
									aspernatur harum facere. Reprehenderit eligendi, officia
									praesentium cumque nobis similique enim assumenda placeat
									quam?
								</p>
							</div>
							<div className="for-margin">
								<span>Description&nbsp;:</span>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Rerum voluptas rem ex totam doloremque est libero natus! Non
									eos cumque, voluptatem aliquid velit deserunt? Molestias animi
									a amet omnis minus?
								</p>
							</div>
							<div className="for-margin">
								<span>Date&nbsp;:</span>
								<p>12-20-2022</p>
							</div>

							<div className="for-margin">
								<span>Attachment&nbsp;:</span>
								<a href="deme.txt" download>
									{"demo.txt"}
								</a>
							</div>

							<span className="icon" onClick={() => setAppointmentT(false)}>
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
