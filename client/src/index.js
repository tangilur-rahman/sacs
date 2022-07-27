import React from "react";
import ReactDOM from "react-dom/client";

// internal components
import App from "./App";
import ContextHandler from "./ContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ContextHandler>
			<App />
		</ContextHandler>
	</React.StrictMode>
);
