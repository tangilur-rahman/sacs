// external component
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// establish connection with socket-server
	const [mySocket, setMySocket] = useState();

	useEffect(() => {
		setMySocket(io.connect("http://localhost:4000"));
	}, []);

	// for get & set current user
	const [currentUser, setCurrentUser] = useState("");

	// for when submitted appointment, refetching data in dashboard
	const [isSubmitted, setIsSubmitted] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{
					mySocket,
					currentUser,
					setCurrentUser,
					isSubmitted,
					setIsSubmitted
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
