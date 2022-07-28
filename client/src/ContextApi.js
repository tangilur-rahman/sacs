// external component
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	const [registerT, setRegisterT] = useState(false);

	const [totalT, setTotalT] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{ registerT, setRegisterT, totalT, setTotalT }}
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
