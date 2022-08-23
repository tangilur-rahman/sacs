// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import sortArray from "sort-array";

// internal components
import "./ListOfTotal.css";

const ListOfTotal = ({ totalValue, setTotalValue, setUserEdit }) => {
	// check fetching complete or not from server
	const [isLoading, setIsLoading] = useState(true);

	// for get specific-user for display in details
	const [specificUser, setSpecificUser] = useState("");

	// for get search-field values
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState("");

	// for displaying users
	const [displayingUser, setDisplayingUser] = useState("");

	// for outside-click closed start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setTotalValue(false);
			setSearchText("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed end

	// fetching all advisors & students from server start
	useEffect(() => {
		(async () => {
			if (totalValue) {
				try {
					if (totalValue === "List Of Advisors") {
						const response = await fetch("/user/advisor-list");
						const result = await response.json();

						if (response.status === 200) {
							setDisplayingUser(result ? result : "");
							setIsLoading(false);
						} else if (result.error) {
							toast.error(result.error, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
						}
					} else if (totalValue === "List Of Students") {
						const response = await fetch("/user/student-list");
						const result = await response.json();

						if (response.status === 200) {
							setDisplayingUser(result ? result : "");
							setIsLoading(false);
						} else if (result.error) {
							toast.error(result.error, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
						}
					}
				} catch (error) {
					toast.error(error.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}
			}
		})();
	}, [totalValue]);
	//	fetching all advisors & students from server end

	// for fetching specific user start
	useEffect(() => {
		if (specificUser) {
			(async () => {
				try {
					const response = await fetch(`/user/specific-user/${specificUser}`);

					const result = await response.json();

					if (response.status === 200) {
						setUserEdit(result);
						setTotalValue(false);
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
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [specificUser]);
	// for fetching specific user end

	// search user handler start
	useEffect(() => {
		if (searchText) {
			(async () => {
				if (totalValue.title === "List Of Advisors") {
					try {
						const response = await fetch(`/user/advisor/search/${searchText}`);
						const result = await response.json();
						if (response.status === 200) {
							setSearchResult(result);
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
				} else {
					try {
						const response = await fetch(`/user/student/search/${searchText}`);
						const result = await response.json();
						if (response.status === 200) {
							setSearchResult(result);
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
				}
			})();
		}
	}, [searchText, totalValue]);
	// search user handler end

	// for initialize search-result start
	useEffect(() => {
		if (searchResult) {
			setDisplayingUser(searchResult);
		}

		if (!searchText) {
			setDisplayingUser(displayingUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchResult, searchText]);
	// for initialize search-result end

	return (
		<>
			{isLoading ? (
				<div className="loading-animation">
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
				</div>
			) : (
				<div className="container-fluid p-0 total-main-container">
					<div className="row m-0 total-wrapper">
						<div ref={myRef} className="col-11 p-0 total-container">
							{/* table start  */}
							<div className="header">
								<div className="user-search" ref={myRef}>
									<i className="bi bi-search-heart"></i>
									<input
										type="search"
										autoComplete="on"
										onChange={(e) => setSearchText(e.target.value)}
										value={searchText}
										placeholder={
											totalValue === "List Of Advisors"
												? "Search advisors"
												: "Search students"
										}
									/>
								</div>
								<h2>{totalValue}</h2>
							</div>
							<div
								className="table-container"
								data-aos="fade-up"
								data-aos-delay="0"
							>
								<table className="table table-hover">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Name</th>
											<th scope="col">ID</th>
											<th scope="col">Email</th>
											<th scope="col">Gender</th>
											<th scope="col">Department</th>
											{totalValue === "List Of Advisors" && (
												<th scope="col">Range</th>
											)}
											{totalValue !== "List Of Advisors" && (
												<>
													<th scope="col">Semester</th>
													<th scope="col">Aca... Year</th>
												</>
											)}

											<th scope="col">Update Date</th>
										</tr>
									</thead>

									<tbody>
										{displayingUser &&
											sortArray(displayingUser, {
												by: "updatedAt",
												order: "desc"
											})
												.map((value, index) => {
													return (
														<tr
															key={index}
															onClick={() => setSpecificUser(value._id)}
														>
															<td id="count">{index + 1}</td>

															<td id="name">
																<img
																	src={`uploads/profile-img/${value.profile_img}`}
																	alt="profile-img"
																	id="profile-img"
																	className="img-fluid"
																/>
																<input
																	type="text"
																	readOnly
																	value={value.name}
																/>
															</td>

															<td id="id">
																<input type="text" readOnly value={value.id} />
															</td>

															<td id="email">
																<input
																	type="text"
																	readOnly
																	value={value.email}
																/>
															</td>

															<td id="gender">
																<input
																	type="text"
																	readOnly
																	value={value.gender}
																	style={{ textTransform: "capitalize" }}
																/>
															</td>

															<td id="department">
																<input
																	type="text"
																	readOnly
																	value={value.department.toUpperCase()}
																/>
															</td>

															{totalValue === "List Of Advisors" && (
																<td id="range">
																	<input
																		type="text"
																		readOnly
																		value={
																			value.minRange + " - " + value.maxRange
																		}
																	/>
																</td>
															)}

															{totalValue !== "List Of Advisors" && (
																<>
																	<td id="semester">
																		<input
																			type="text"
																			readOnly
																			value={value.semester}
																		/>
																	</td>

																	<td id="year">
																		<input
																			type="text"
																			readOnly
																			value={value.year}
																		/>
																	</td>
																</>
															)}

															<td id="update-date">
																<input
																	type="text"
																	readOnly
																	value={moment(value.updatedAt).format(
																		"DD MMM YY"
																	)}
																/>
															</td>
														</tr>
													);
												})
												.reverse()}
									</tbody>
								</table>
							</div>

							{/* table end  */}
							<span className="icon" onClick={() => setTotalValue(false)}>
								<i className="fa-solid fa-circle-xmark"></i>
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ListOfTotal;
