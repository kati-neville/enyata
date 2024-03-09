export const ErrorText = ({ text }: { text: string }) => {
  return (
    <div className="error_text_container">
      <p>
        Oops!, <br /> {text}
      </p>
    </div>
  );
};
