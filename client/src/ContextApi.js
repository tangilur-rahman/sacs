// external component
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	const [signupT, setSignupT] = useState(false);

	const [totalT, setTotalT] = useState("");

	return (
		<>
			<rootContext.Provider value={{ signupT, setSignupT, totalT, setTotalT }}>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
