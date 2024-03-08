import { useState } from "react";
import { Modal } from "../modal";
import "./theme-switcher.css";
import { THEME } from "@/utils/constants";
import { handleSetTheme } from "@/utils";

function ButtonSwitcher({
	onClick,
	className = "theme_display_small",
	active,
}: {
	onClick: () => void;
	className?: string;
	active?: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className={`theme_selector_container ${active ? "theme_active" : ""}`}>
			<div className={`theme_display ${className}`}></div>
		</button>
	);
}

export enum Themes {
	YELLOW = "yellow",
	BLUE = "blue",
	PINK = "pink",
}

export const ThemeSwitcher = () => {
	const [open, setOpen] = useState(false);

	console.log(localStorage.getItem(THEME));

	return (
		<>
			<ButtonSwitcher onClick={() => setOpen(true)} active />

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				className="theme_switcher_modal">
				<div className="theme_switcher_modal_title">
					<h1>Choose Theme</h1>
				</div>

				<div className="theme_switcher_modal_body">
					<ButtonSwitcher
						onClick={() => {
							setOpen(false);
							handleSetTheme(Themes.PINK);
						}}
						className="theme_display_large pink"
						active={localStorage.getItem(THEME) === Themes.PINK}
					/>
					<ButtonSwitcher
						onClick={() => {
							setOpen(false);
							handleSetTheme(Themes.BLUE);
						}}
						className="theme_display_large blue"
						active={localStorage.getItem(THEME) === Themes.BLUE}
					/>
					<ButtonSwitcher
						onClick={() => {
							setOpen(false);
							handleSetTheme(Themes.YELLOW);
						}}
						className="theme_display_large yellow"
						active={localStorage.getItem(THEME) === Themes.YELLOW}
					/>
				</div>
			</Modal>
		</>
	);
};
