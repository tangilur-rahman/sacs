// internal components
import Left from "../../components/for_dashboard/Left/Left";
import Middle from "../../components/for_dashboard/Middle/Middle";
import Right from "../../components/for_dashboard/Right/Right";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

import ListOfTotal from "../../components/for_popup/ListOfTotal/ListOfTotal";
import Register from "../../components/for_popup/Register/Register";
import { GetContextApi } from "./../../ContextApi";

const Dashboard = () => {
	const { registerT, totalT } = GetContextApi();

	return (
		<>
			<Navbar />

			<div className="container-fluid p-0 dashboard-main-container ">
				<div
					className="row dashboard-container"
					id={registerT || totalT ? "blur" : null}
				>
					<div className="col-11">
						<div className="row">
							<div className="col-3 p-0 left">
								<Left />
							</div>

							<div className="col-4 p-0 middle">
								<Middle />
							</div>

							<div className="col-4 p-0 right">
								<Right />
							</div>
						</div>
					</div>
				</div>
				<Register />
				<ListOfTotal />
			</div>
		</>
	);
};

export default Dashboard;
