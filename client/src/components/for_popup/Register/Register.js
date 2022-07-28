// external components
import { useEffect, useRef, useState } from "react";
// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import { GetContextApi } from "../../../ContextApi";

import DepartDropdown from "./Dropdown/DepartDropdown/DepartDropdown";
import GroupDropdown from "./Dropdown/GroupDropdown/GroupDropdown";
import RoleDropdown from "./Dropdown/RoleDropdown/RoleDropdown";
import SemesterDropDown from "./Dropdown/SemesterDropdown/SemesterDropdown";
import YearDropdown from "./Dropdown/YearDropdown/YearDropdown";
import "./Register.css";

const Register = () => {
	// for register toggle
	const { registerT, setRegisterT } = GetContextApi();

	// get dropdown section values
	const [getRole, setGetRole] = useState("Administrator");
	const [getDepart, setGetDepart] = useState("");
	const [getGroup, setGetGroup] = useState("");
	const [getSemester, setGetSemester] = useState("");
	const [year, setYear] = useState("");

	// get user information
	const [user, setUser] = useState({
		name: "",
		id: "",
		email: "",
		password: "",
		c_password: "",
		role: "",
		department: "",
		group: "",
		semester: "",
		year: ""
	});

	const { name, id, email, password, c_password } = user;

	// for get input field value
	const onChangeHandler = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	// for submit data to server
	const submitHandle = async (event) => {
		event.preventDefault();

		const userObject = {
			name,
			id,
			email,
			password,
			c_password,
			role: getRole,
			department: getDepart,
			group: getGroup,
			semester: getSemester,
			year: year
		};

		try {
			const response = await fetch("/register", {
				method: "POST",
				body: JSON.stringify(userObject),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const result = await response.json();

			if (result.error) {
				toast.warn(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 5000
				});
			} else {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 5000
				});
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 5000
			});
		}
	};

	// for outside-click close start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current.contains(e.target)) {
			setRegisterT(false);
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
			{registerT && (
				<div className="container-fluid  p-0 signup-main-container">
					<div className="row m-0 signup-wrapper">
						<div className="col-9 p-0 ">
							<div ref={myRef} className="row m-0 signup-container">
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
												name="name"
												placeholder="Enter your name..."
												required
												onChange={onChangeHandler}
											/>
											<label htmlFor="name">Name : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="number"
												className="form-control"
												id="id"
												name="id"
												placeholder="Enter your id..."
												required
												onChange={onChangeHandler}
											/>
											<label htmlFor="id">ID : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												placeholder="Enter your email..."
												required
												onChange={onChangeHandler}
											/>
											<label htmlFor="email">Email : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="password"
												className="form-control"
												id="password"
												name="password"
												placeholder="Enter your password..."
												required
												onChange={onChangeHandler}
											/>
											<label htmlFor="password">Password : </label>
										</div>

										<div className="form-floating mb-3">
											<input
												type="password"
												className="form-control"
												id="c_password"
												name="c_password"
												placeholder="Enter your password..."
												required
												onChange={onChangeHandler}
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
												{getRole !== "Administrator" && (
													<DepartDropdown
														getDepart={getDepart}
														setGetDepart={setGetDepart}
													/>
												)}
											</div>

											{getRole !== "Administrator" && (
												<div className="group">
													<GroupDropdown
														getGroup={getGroup}
														setGetGroup={setGetGroup}
													/>
													<SemesterDropDown
														getSemester={getSemester}
														setGetSemester={setGetSemester}
													/>
												</div>
											)}

											<div className="signup-footer">
												{getRole !== "Administrator" && (
													<div className="year">
														<span>Year :</span>
														<YearDropdown setYear={setYear} />
													</div>
												)}

												<div className="btn-container">
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => setRegisterT(false)}
													>
														Cancel
													</button>

													<button
														type="button"
														className="btn btn-success"
														onSubmit={submitHandle}
													>
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
					<ToastContainer />
				</div>
			)}
		</>
	);
};

export default Register;
