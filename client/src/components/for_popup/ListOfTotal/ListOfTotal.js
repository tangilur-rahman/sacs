// external components

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./ListOfTotal.css";

const ListOfTotal = () => {
	const { totalT, setTotalT } = GetContextApi();

	console.log(totalT);

	return (
		<>
			{totalT && (
				<div className="container-fluid p-0 total-main-container">
					<div className="row m-0 total-wrapper">
						<div className="col-9 p-0 total-container"></div>
					</div>
				</div>
			)}
		</>
	);
};

export default ListOfTotal;
