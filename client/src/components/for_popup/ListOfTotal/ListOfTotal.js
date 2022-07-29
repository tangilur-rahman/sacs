// external components
import { useEffect, useRef, useState } from "react";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./ListOfTotal.css";

const ListOfTotal = () => {
	const { totalT, setTotalT } = GetContextApi();

	const [readOnlyT, setReadOnlyT] = useState(true);

	// fetching from database start
	const [data, setData] = useState("");

	console.log(totalT === "List Of Instructors");

	const getList = async () => {
		try {
			if (totalT === "List Of Instructors") {
				const response = await fetch("/instructor-list");
				const result = await response.json();

				if (result.error) {
					toast.error(result.error, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				} else {
					setData(result);
				}
			} else {
				const response = await fetch("/student-list");
				const result = await response.json();
				if (result.error) {
					toast.error(result.error, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				} else {
					setData(result);
				}
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}
	};

	// console.log(data);

	useEffect(() => {
		getList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalT]);
	// fetching from database end

	// for outside-click closed start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current.contains(e.target)) {
			setTotalT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed end

	return (
		<>
			{totalT && (
				<div className="container-fluid p-0 total-main-container">
					<div className="row m-0 total-wrapper">
						<div ref={myRef} className="col-10 p-0 total-container">
							{/* table start  */}
							<h2>{totalT}</h2>
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">ID</th>
										<th scope="col">Email</th>
										<th scope="col">Department</th>
										<th scope="col">Semester</th>
										<th scope="col">Year</th>
										<th scope="col">Group</th>
										<th scope="col">Join Date</th>
										<th scope="col">Update Date</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((value, index) => {
											return (
												<>
													<tr key={index}>
														<td id="name">
															<img
																src={value.profile_img}
																alt="profile-img"
																id="profile-img"
																className="img-fluid"
															/>
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.name}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="id">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.id}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="email">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.email}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="department">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.department}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="semester">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.semester}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="year">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.year}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="group">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.group}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="join-date">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.createdAt}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td id="update-date">
															<input
																type="text"
																readOnly={readOnlyT}
																value={value.updatedAt}
																className={readOnlyT && "bg-remove"}
															/>
														</td>

														<td>
															<div className="modify">
																<span onClick={() => setReadOnlyT(!readOnlyT)}>
																	<i className="fa-solid fa-pen-to-square"></i>
																</span>

																<span>
																	<i className="fa-solid fa-trash-can"></i>
																</span>
															</div>
														</td>
													</tr>
												</>
											);
										})}
								</tbody>
							</table>
							{/* table end  */}
						</div>
					</div>
					<ToastContainer />
				</div>
			)}
		</>
	);
};

export default ListOfTotal;
