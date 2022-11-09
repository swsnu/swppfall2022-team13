import PropTypes from "prop-types";
import "./SearchBar.css";
export interface SearchBarInterface {
  search?: string;
  onChange?: (e: any) => void;
}

function SearchBar(props: SearchBarInterface) {
  return (
    <div className="SearchBar">
      <input
        className="input"
        type="text"
        placeholder="Search name.."
        value={props.search}
        onChange={props.onChange}
      />
    </div>
  );
}

export default SearchBar;
