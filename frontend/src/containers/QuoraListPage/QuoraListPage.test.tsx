import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { PetitionState } from "../../store/slices/petition";
import { UserType } from "../../store/slices/user";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import QuoraListPage from "./QuoraListPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Quora, { QuoraType } from "../../components/Quora/Quora";
import {stubInitialState, stubInitialState2, stubInitialState3, stubInitialState4, stubInitialState5 } from "../../test-utils/initialState";


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
user: stubInitialState5
});

const spyNavBar = () => <p>NavBar</p>;
jest.mock("../../components/NavBar/NavBar", () => spyNavBar);

describe("<QuoraListPage />", () => {
  let quoraList: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    quoraList = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<QuoraListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  it("should render quoraList", () => {
    const { container } = render(quoraList);
    expect(container).toBeTruthy();
  });
  it("should render todos", () => {
    render(quoraList);
    //const petitions = screen.getAllByTestId("spyPetition");
    //expect(petitions).toHaveLength(2);
  });
  it("should handle click", () => {
    render(quoraList);
    const todo = screen.getByText("Open Quora");
    //const todo = todos[0];
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(todo!);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});
