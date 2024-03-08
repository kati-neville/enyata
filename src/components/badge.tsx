import { ReactNode } from "react";
import "./components.css";

export const Badge = ({ children }: { children: ReactNode }) => {
  return <div className="badge_container">{children}</div>;
};
