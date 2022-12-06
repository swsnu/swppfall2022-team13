import { fireEvent, render, screen } from "@testing-library/react";
import ImageBtn from "./ImageBtn";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<ImageBtn />", () => {
  it("should handle clickEvent", () => {
    render(<ImageBtn url="/politician/1/" />);
    const img = screen.getByAltText("hmm"); // Implicit assertion
    fireEvent.click(img);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
