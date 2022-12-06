import { fireEvent, render, screen } from "@testing-library/react";
import CarouselContent from "./CarouselContent";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<CarouselContent />", () => {
  it("should handle rightContent clickEvent", () => {
    render(<CarouselContent title="test_title" url="/politician/1/" />);
    const right_content = screen.getByText("test_title"); // Implicit assertion
    fireEvent.click(right_content);
    expect(mockNavigate).toHaveBeenCalled();
  });
  it("should handle image clickEvent", () => {
    render(<CarouselContent title="test_title" url="/politician/1/" />);
    const image = screen.getByAltText("Hmm"); // Implicit assertion
    fireEvent.click(image);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
