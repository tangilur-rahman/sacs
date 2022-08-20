// external components
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal components
import Navbar from "../../components/Navbar/Navbar";
import { GetContextApi } from "../../ContextApi";
import LeftSidebar from "./../../components/LeftSidebar/LeftSidebar";
import "./Homepage.css";

// pop-up components
import ListOfTotal from "../../components/for_popup/ListOfTotal/ListOfTotal";
import ProfileEdit from "../../components/for_popup/ProfileEdit/ProfileEdit";
import Logout from "../../components/Logout";
import AppointmentDetails from "./../../components/for_popup/AppointmentDetails/AppointmentDetails";
import Register from "./../../components/for_popup/Register/Register";

const Homepage = ({
	selected,
	setSelected,
	appDisplay,
	setAppDisplay,
	setMessageId
}) => {
	const { currentUser, setCurrentUser, isSubmitted } = GetContextApi();

	// for redirect login-page
	const Navigate = useNavigate();

	// for pop-up toggle
	const [registerT, setRegisterT] = useState(false);
	const [totalValue, setTotalValue] = useState("");
	const [profileT, setProfileT] = useState(false);

	// for edit user by administrator
	const [userEdit, setUserEdit] = useState(false);

	// for refetching when any user created
	const [created, setCreated] = useState("");

	// for get current user
	const getCurrentUser = async () => {
		try {
			const response = await fetch("/user");

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				return Navigate("/login");
			} else {
				setCurrentUser(result);
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
	}, [isSubmitted]);

	// navigate url
	useEffect(() => {
		if (selected === "dashboard") {
			return Navigate("dashboard");
		} else if (selected === "chat") {
			return Navigate("chat");
		} else if (selected === "appointment") {
			return Navigate("create-appointment");
		} else if (selected === "advisor") {
			return Navigate("my-advisor");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	return (
		<>
			<Navbar
				currentUser={currentUser}
				registerT={registerT}
				setRegisterT={setRegisterT}
				setTotalValue={setTotalValue}
				setProfileT={setProfileT}
				created={created}
				setAppDisplay={setAppDisplay}
				setMessageId={setMessageId}
				selected={selected}
				setSelected={setSelected}
			/>

			<div className="container-fluid p-0 homepage-main-container">
				<div
					className="row m-0 homepage-container"
					id={
						userEdit ||
						registerT ||
						totalValue.list?.length > 0 ||
						appDisplay ||
						profileT === "profile"
							? "blur"
							: ""
					}
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

							<div className="col-8 right">
								<Outlet />
							</div>
						</div>
					</div>
				</div>

				{/* all popup declare here  */}
				<Register
					registerT={registerT}
					setRegisterT={setRegisterT}
					setCreated={setCreated}
				/>

				{totalValue && (
					<ListOfTotal
						totalValue={totalValue}
						setTotalValue={setTotalValue}
						setUserEdit={setUserEdit}
					/>
				)}

				{appDisplay && (
					<AppointmentDetails
						appDisplay={appDisplay}
						setAppDisplay={setAppDisplay}
						currentUser={currentUser}
					/>
				)}

				{(userEdit || profileT === "profile") && (
					<ProfileEdit
						setProfileT={setProfileT}
						currentUser={currentUser}
						userEdit={userEdit}
						setUserEdit={setUserEdit}
						setCreated={setCreated}
					/>
				)}

				{profileT === "logout" && <Logout />}

				<ToastContainer />
			</div>
		</>
	);
};

export default Homepage;
