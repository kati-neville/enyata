import "./input.css";
import searchIcon from "@assets/svgs/search.svg";

interface InputProps {
  placeholder?: string;
  iconPosition?: "right" | "left";
  variant?: "outlined-bold" | "outlined-light";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  value?: string;
}
export const Input: React.FC<InputProps> = ({
  placeholder = "Enter pokemon name",
  iconPosition = "right",
  variant = "outlined-bold",
  onChange,
  onButtonClick,
  value,
}) => {
  return (
    <>
      <div
        className={`input_container ${
          variant === "outlined-bold"
            ? "outlined-bold spacer"
            : "outlined-light"
        } ${
          iconPosition === "left"
            ? "left_position_space"
            : "right_position_space"
        }`}
      >
        <input
          type="text"
          className="input"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button
          onClick={onButtonClick}
          className={`input_icon ${
            iconPosition === "left" ? "left-position" : "right-position"
          }`}
        >
          <img src={searchIcon} alt="search icon" />
        </button>
      </div>
    </>
  );
};
