import "./error.css";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
	const error: any = useRouteError();
	const message =
		typeof error.message === "string" ? error.message : error.message?.[0];

	return (
		<div className="error_container">
			<h1 className="error_title">Oooops, Sorry</h1>

			<p className="error_text">Sorry, an unexpected error has occurred.</p>

			<p className="error_message">
				{<i>{error.statusText || message || ""}</i>}
			</p>
		</div>
	);
};
