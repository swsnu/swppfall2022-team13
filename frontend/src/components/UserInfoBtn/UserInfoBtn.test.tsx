import { fireEvent, render, screen } from "@testing-library/react";
import UserInfoBtn from "./UserInfoBtn";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<UserInfoBtn />", () => {
  it("should handle clickEvent", () => {
    render(<UserInfoBtn url="/politician/1/" />);
    const img = screen.getByAltText("hmm"); // Implicit assertion
    fireEvent.click(img);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
