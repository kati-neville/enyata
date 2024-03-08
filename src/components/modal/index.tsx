import "./modal.css";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  variant = "center",
  children,
  open,
  onClose,
  className,
}: {
  variant?: "center" | "side";
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}) => {
  if (!open) return null;
  const isCenter = variant === "center";
  return createPortal(
    <>
      <div className="modal_overlay" onClick={onClose}></div>

      <div
        className={`modal_container ${isCenter ? "center_modal" : "side_modal"}
				  ${isCenter && open ? "opening" : "closing"} 
		 ${className}`}
      >
        {children}
      </div>
    </>,
    document.getElementById("modal")!,
  );
};
