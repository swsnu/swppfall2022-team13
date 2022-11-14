import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("<SearchBar />", () => {
  it("should handle render normally", () => {
    render(<SearchBar />);
    const searchBar = screen.getByPlaceholderText("Search name.."); // Implicit assertion
  });
});
