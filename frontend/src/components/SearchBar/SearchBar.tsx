import PropTypes from "prop-types";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
export interface SearchBarInterface {
  search?: string;
  onChange?: (e: any) => void;
}

function SearchBar(props: SearchBarInterface) {
  return (
    <div className="SearchBar">
      <SearchIcon></SearchIcon>
      <input
        className="input"
        type="text"
        placeholder="Search .."
        value={props.search}
        onChange={props.onChange}
      />
    </div>
  );
}

export default SearchBar;
