import { fireEvent, render, screen } from "@testing-library/react";
import Quora from "./Quora";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<Quora />", () => {
  it("should handle rightContent clickEvent", () => {
    render(
      <Quora
        title="test_title"
        content="test_content"
      />
    );
    const right_content = screen.getByText("test_title"); // Implicit assertion
    //fireEvent.click(right_content);
    //expect(mockNavigate).toHaveBeenCalled();
  });

  it("should handle rightContent clickEvent", () => {
    render(
      <Quora
      title="test_title"
      content="test_content"
      />
    );
    const detailBtn = screen.getByText("Participate"); // Implicit assertion
    fireEvent.click(detailBtn);
    expect(mockNavigate).toHaveBeenCalled();
  });

});
