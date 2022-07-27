// external components
import { useEffect, useRef, useState } from "react";

// internal components
import { GetContextApi } from "./../../../ContextApi";

import DepartDropdown from "./Dropdown/DepartDropdown/DepartDropdown";
import GroupDropdown from "./Dropdown/GroupDropdown/GroupDropdown";
import RoleDropdown from "./Dropdown/RoleDropdown/RoleDropdown";
import SemesterDropDown from "./Dropdown/SemesterDropdown/SemesterDropdown";
import YearDropdown from "./Dropdown/YearDropdown/YearDropdown";
import "./Signup.css";

const Signup = () => {
	// for signup toggle
	const { signupT, setSignupT } = GetContextApi();

	// get user role
	const [getRole, setGetRole] = useState("Administrator");

	// for outside-click close start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current.contains(e.target)) {
			setSignupT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click close end

	return (
		<>
			{signupT && (
				<div ref={myRef} className="container-fluid  p-0 signup-main-container">
					<div className="row m-0 signup-wrapper">
						<div className="col-9 p-0 ">
							<div className="row m-0 signup-container">
								<div className="col-6 p-0 left">
									<img
										src="/assets/images/sign-up-img.png"
										alt="cover-img"
										className="img-fluid"
									/>
								</div>
								<div className="col-6 p-0 right">
									<h2>Register New User</h2>
									<form>
										<div className="form-floating mb-3">
											<input
												type="text"
												className="form-control"
												id="name"
												placeholder="Enter your name..."
												required
											/>
											<label htmlFor="name">Name : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="number"
												className="form-control"
												id="id"
												placeholder="Enter your id..."
												required
											/>
											<label htmlFor="id">ID : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="email"
												className="form-control"
												id="email"
												placeholder="Enter your email..."
												required
											/>
											<label htmlFor="email">Email : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="password"
												className="form-control"
												id="password"
												placeholder="Enter your password..."
												required
											/>
											<label htmlFor="password">Password : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="password"
												className="form-control"
												id="c_password"
												placeholder="Enter your password..."
												required
											/>
											<label htmlFor="c_password">Conform Password : </label>
										</div>

										{/* dropdown start  */}
										<div
											className={
												getRole === "Administrator" && "for-admin-role"
											}
										>
											<div className="group">
												<RoleDropdown
													getRole={getRole}
													setGetRole={setGetRole}
												/>
												{getRole !== "Administrator" && <DepartDropdown />}
											</div>

											{getRole !== "Administrator" && (
												<div className="group">
													<GroupDropdown />
													<SemesterDropDown />
												</div>
											)}

											<div className="signup-footer">
												{getRole !== "Administrator" && (
													<div className="year">
														<span>Year :</span>
														<YearDropdown />
													</div>
												)}

												<div className="btn-container">
													<button type="button" className="btn btn-danger">
														Cancel
													</button>

													<button type="button" className="btn btn-success">
														Submit
													</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Signup;
