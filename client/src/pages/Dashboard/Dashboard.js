// internal components
import Left from "../../components/for_dashboard/Left/Left";
import Middle from "../../components/for_dashboard/Middle/Middle";
import Right from "../../components/for_dashboard/Right/Right";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="container-fluid dashboard-main-container">
				<div className="row col-11 dashboard-container">
					<div className="col-3 p-0 left">
						<Left />
					</div>

					{/* middle-section-start  */}
					<div className="col-4 p-0 middle">
						<Middle />
					</div>
					{/* middle-section-end  */}

					{/* right-section-start  */}
					<div className="col-4 p-0 right">
						<Right />
					</div>
					{/* right-section-end  */}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
