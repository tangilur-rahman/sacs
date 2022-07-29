// external components
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

	// for redirect login-page
	const Navigate = useNavigate();

	// get current user
	const [currentUser, setCurrentUser] = useState("");
	const [check, setCheck] = useState(false);

	const getCurrentUser = async () => {
		try {
			const response = await fetch("/dashboard");

			const result = await response.json();

			if (result.error) {
				return Navigate("/login");
			} else {
				setCurrentUser(result);
				setCheck(true);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}
	};

	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Navbar currentUser={currentUser} />

			<div className="container-fluid p-0 dashboard-main-container ">
				<div
					className="row dashboard-container"
					id={registerT || totalT ? "blur" : null}
				>
					<div className="col-11">
						<div className="row">
							<div className="col-3 p-0 left">
								<Left currentUser={currentUser} check={check} />
							</div>

							<div className="col-4 p-0 middle">
								<Middle currentUser={currentUser} />
							</div>

							<div className="col-4 p-0 right">
								<Right />
							</div>
						</div>
					</div>
				</div>
				<Register />
				<ListOfTotal />
				<ToastContainer />
			</div>
		</>
	);
};

export default Dashboard;
