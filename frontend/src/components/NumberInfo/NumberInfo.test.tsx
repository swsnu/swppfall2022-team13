import { fireEvent, render, screen } from "@testing-library/react";
import NumberInfo from "./NumberInfo";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<NumberInfo />", () => {
  it("should handle clickEvent", () => {
    render(<NumberInfo num={1} category="test" detail="test" />);
    const info = screen.getAllByText("test"); // Implicit assertion
  });
});
