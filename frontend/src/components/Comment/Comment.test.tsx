import { fireEvent, render, screen } from "@testing-library/react";
import Comment from "./Comment";
import { getMockStore } from "../../test-utils/mock";
import { Provider } from "react-redux";
import {stubInitialState, stubInitialState2, stubInitialState3, stubInitialState4, stubInitialState5, stubInitialState6 } from "../../test-utils/initialState";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));


const mockStore = getMockStore({
article: stubInitialState,
politician: stubInitialState2,
petition: stubInitialState3,
quora: stubInitialState4,
user: stubInitialState5,
comment: stubInitialState6,
});

describe("<Comment />", () => {
  it("should handle rightContent clickEvent", () => {
    render(
        <Provider store={mockStore}>
      <Comment
                id={1}
                quora_id={1}
                author_id = {1}
                content={"test"}
      />
      </Provider>
    );
    const content1 = screen.getByText("ang gimochi");
    const content2 = screen.getByText("test"); 
  });

});
