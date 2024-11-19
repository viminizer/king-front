import React from "react";
import App from "./app/App";
import CssBaseline from "@mui/material/CssBaseline";
import ContextProvider from "./app/context/ContextProvider";
import theme from "./app/MaterialTheme/index";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ContextProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<App />
					</Router>
				</ThemeProvider>
			</ContextProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
