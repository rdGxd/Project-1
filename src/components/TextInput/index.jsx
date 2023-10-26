import P from "prop-types";
import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      onChange={handleChange}
      type="search"
      value={searchValue}
      className="text-input"
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
