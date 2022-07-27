// external components
import { useEffect, useRef } from "react";

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./ListOfTotal.css";

const ListOfTotal = () => {
	const { totalT, setTotalT } = GetContextApi();

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
						<div ref={myRef} className="col-9 p-0 total-container">
							{/* table start  */}
							<table class="table">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">First</th>
										<th scope="col">Last</th>
										<th scope="col">Handle</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">1</th>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
									</tr>
									<tr>
										<th scope="row">2</th>
										<td>Jacob</td>
										<td>Thornton</td>
										<td>@fat</td>
									</tr>
									<tr>
										<th scope="row">3</th>
										<td colspan="2">Larry the Bird</td>
										<td>@twitter</td>
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
