// external components
import { useEffect, useRef, useState } from "react";

// react-toastify
import { toast } from "react-toastify";

// internal components
import DepartDropdown from "./Dropdown/DepartDropdown/DepartDropdown";
import GroupDropdown from "./Dropdown/GroupDropdown/GroupDropdown";
import RoleDropdown from "./Dropdown/RoleDropdown/RoleDropdown";
import SemesterDropDown from "./Dropdown/SemesterDropdown/SemesterDropdown";
import YearDropdown from "./Dropdown/YearDropdown/YearDropdown";
import "./Register.css";

const Register = ({ registerT, setRegisterT }) => {
	// get dropdown section values
	const [getRole, setRole] = useState(null);
	const [getDepart, setDepart] = useState("");
	const [getGroup, setGroup] = useState("");
	const [getSemester, setSemester] = useState("");
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

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});

				setUser({
					name: "",
					id: "",
					email: "",
					password: "",
					c_password: ""
				});
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else {
				toast.error(result.message, {
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

	// for outside-click close start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setRegisterT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [registerT]);
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
												value={name}
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
												value={id}
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
												value={email}
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
												value={password}
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
												value={c_password}
												onChange={onChangeHandler}
											/>
											<label htmlFor="c_password">Conform Password : </label>
										</div>

										{/* dropdown start  */}
										<div
											className={
												getRole === "Administrator" ? "for-admin-role" : ""
											}
										>
											<div className="group">
												<RoleDropdown getRole={getRole} setRole={setRole} />

												{getRole !== "Administrator" && getRole !== null && (
													<DepartDropdown
														getDepart={getDepart}
														setDepart={setDepart}
													/>
												)}
											</div>

											{getRole !== "Administrator" && getRole !== null && (
												<div className="group">
													<GroupDropdown
														getGroup={getGroup}
														setGroup={setGroup}
													/>
													<SemesterDropDown
														getSemester={getSemester}
														setSemester={setSemester}
													/>
												</div>
											)}

											<div className="signup-footer">
												{getRole !== "Administrator" && getRole !== null && (
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
														onClick={submitHandle}
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
				</div>
			)}
		</>
	);
};

export default Register;
