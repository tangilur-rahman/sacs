// external components
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import LeftSidebar from "../../components/for_homepage/LeftSidebar.js/LeftSidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

// pop-up components
import ListOfTotal from "../../components/for_popup/ListOfTotal/ListOfTotal";
import { GetContextApi } from "../../ContextApi";
import Register from "./../../components/for_popup/Register/Register";

const Homepage = () => {
	const { currentUser, setCurrentUser, setIsLoading } = GetContextApi();

	// for redirect login-page
	const Navigate = useNavigate();

	// for pop-up toggle
	const [registerT, setRegisterT] = useState(false);
	const [totalT, setTotalT] = useState(false);

	// for get selected left-sidebar
	const [selected, setSelected] = useState("");

	// for get current user
	const getCurrentUser = async () => {
		try {
			const response = await fetch("/user");

			const result = await response.json();

			if (result.error) {
				return Navigate("/login");
			} else {
				setCurrentUser(result);
				setIsLoading(false);
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

	// navigate url
	useEffect(() => {
		if (selected === "Administrator") {
			return Navigate("dashboard");
		} else if (selected === "group-chat") {
			return Navigate("chat");
		} else if (selected === "appointment") {
			return Navigate("create-appointment");
		} else if (selected === "instructor") {
			return Navigate("my-instructor");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	return (
		<>
			<Navbar currentUser={currentUser} />

			<div className="container-fluid p-0 homepage-main-container">
				<div
					className="row m-0 homepage-container"
					id={registerT || totalT ? "blur" : ""}
				>
					<div className="col-11 p-0 ">
						<div className="row m-0 ">
							<div className="col-3 p-0 left">
								<LeftSidebar
									currentUser={currentUser}
									selected={selected}
									setSelected={setSelected}
								/>
							</div>

							<div className="col-9 right">
								<Outlet />
							</div>
						</div>
					</div>
				</div>
				<Register registerT={registerT} setRegisterT={setRegisterT} />

				<ListOfTotal totalT={totalT} setTotalT={setTotalT} />
				<ToastContainer />
			</div>
		</>
	);
};

export default Homepage;
