// external components
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// react-toastify
import { toast } from "react-toastify";

const Logout = ({ setProfileT }) => {
	// For Redirect "/login"
	const Navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			const response = await fetch("/logout");
			const result = await response.json();

			if (result.message) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 1000
				});
				setTimeout(() => {
					return Navigate("/login");
				}, 2000);
			} else {
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
	};

	useEffect(() => {
		logoutHandler();
		setProfileT(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return;
};

export default Logout;
