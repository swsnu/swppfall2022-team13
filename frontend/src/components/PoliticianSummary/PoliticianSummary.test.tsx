import { fireEvent, render, screen } from "@testing-library/react";
import PoliticianSummary from "./PoliticianSummary";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<PoliticianSummary />", () => {
  it("should handle clickEvent", () => {
    render(
      <PoliticianSummary
        id={1}
        name="test_name"
        elect="test_elect"
        birthdate="test_birthdate"
        politicalParty="test_pp"
        position="test_position"
      />
    );
    const img = screen.getByText("test_name"); // Implicit assertion
    fireEvent.click(img);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
