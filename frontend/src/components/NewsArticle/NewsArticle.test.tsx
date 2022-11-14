import { fireEvent, render, screen } from "@testing-library/react";
import NewsArticle from "./NewsArticle";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<NewsArticle />", () => {
  it("should handle rightContent clickEvent", () => {
    render(
      <NewsArticle
        title="test_title"
        journal_name="한겨레"
        url="/politician/1/"
      />
    );
    const right_content = screen.getByText("test_title"); // Implicit assertion
    fireEvent.click(right_content);
    expect(mockNavigate).toHaveBeenCalled();
  });
  it("should handle image clickEvent", () => {
    render(<NewsArticle journal_name="조선일보" url="/politician/1/" />);
    const image = screen.getByAltText("Hmm"); // Implicit assertion
    fireEvent.click(image);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
