import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import CardPage from "./card-page.jsx";
import { ThemeProvider } from "./context/theme-content.jsx";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:boardId" element={<CardPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
