// external component
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<rootContext.Provider
				value={{
					currentUser,
					setCurrentUser,
					isLoading,
					setIsLoading
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
