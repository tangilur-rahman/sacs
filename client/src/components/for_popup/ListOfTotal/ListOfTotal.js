// external components
import { useEffect, useRef, useState } from "react";

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./ListOfTotal.css";

const ListOfTotal = () => {
	const { totalT, setTotalT } = GetContextApi();

	const [readOnlyT, setReadOnlyT] = useState(true);

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
									<tr>
										<td id="name">
											<img
												src="/assets/profile/tangil.png"
												alt="profile-img"
												id="profile-img"
												className="img-fluid"
											/>
											<input
												type="text"
												readOnly={readOnlyT}
												value="Tangilur Rahman"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="id">
											<input
												type="text"
												readOnly={readOnlyT}
												value="4564435"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="email">
											<input
												type="text"
												readOnly={readOnlyT}
												value="mohammadtangilur@gmail.com"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="department">
											<input
												type="text"
												readOnly={readOnlyT}
												value="English"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="semester">
											<input
												type="text"
												readOnly={readOnlyT}
												value="8th"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="year">
											<input
												type="text"
												readOnly={readOnlyT}
												value="2022"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="group">
											<input
												type="text"
												readOnly={readOnlyT}
												value="A"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="join-date">
											<input
												type="text"
												readOnly={readOnlyT}
												value="23 July 2022"
												className={readOnlyT && "bg-remove"}
											/>
										</td>

										<td id="update-date">
											<input
												type="text"
												readOnly={readOnlyT}
												value="24 Sep 2022"
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
								</tbody>
							</table>
							{/* table end  */}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ListOfTotal;
