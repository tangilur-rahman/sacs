// external component
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	// for when submitted appointment, refetching data in dashboard
	const [isSubmitted, setIsSubmitted] = useState("");

	// for appointment notification
	const [appNotification, setAppNotification] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{
					currentUser,
					setCurrentUser,
					isLoading,
					setIsLoading,
					isSubmitted,
					setIsSubmitted,
					appNotification,
					setAppNotification
				}}
			>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
