import React, { ReactNode } from "react";

type TabDataWrapperProps = {
	title: string;
	details: ReactNode;
};

export const TabDataWrapper: React.FC<TabDataWrapperProps> = ({
	title,
	details,
}) => {
	return (
		<>
			<div className="pokemon_about">
				<h2>{title}</h2>
			</div>

			<div className="pokemon_details">{details}</div>
		</>
	);
};
