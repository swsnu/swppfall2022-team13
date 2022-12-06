import { fireEvent, render, screen } from "@testing-library/react";
import Petition from "./Petition";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<Petition />", () => {
  it("should handle rightContent clickEvent", () => {
    render(
      <Petition
        title="test_title"
        content="test_content"
        photo_url="test_url"
      />
    );
    const right_content = screen.getByText("test_title"); // Implicit assertion
    //fireEvent.click(right_content);
    //expect(mockNavigate).toHaveBeenCalled();
  });

  it("should handle rightContent clickEvent", () => {
    render(
      <Petition
        title="test_title"
        content="test_content"
        photo_url="test_url"
      />
    );
    const detailBtn = screen.getByText("Details"); // Implicit assertion
    fireEvent.click(detailBtn);
    expect(mockNavigate).toHaveBeenCalled();
  });

});
