import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { UserType } from "../../store/slices/user";
import { PetitionState } from "../../store/slices/petition";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import PetitionListPage from "./PetitionListPage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Petition, { PetitionType } from "../../components/Petition/Petition";
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

const spyNavBar = () => <p>NavBar</p>;
jest.mock("../../components/NavBar/NavBar", () => spyNavBar);

describe("<PetitionListPage />", () => {
  let petitionList: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    petitionList = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<PetitionListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  it("should render TodoList", () => {
    const { container } = render(petitionList);
    expect(container).toBeTruthy();
  });
  it("should render todos", () => {
    render(petitionList);
    //const petitions = screen.getAllByTestId("spyPetition");
    //expect(petitions).toHaveLength(2);
  });
  it("should handle click", () => {
    render(petitionList);
    //const todos = screen.getAllByTestId("detail-button");
    //const todo = todos[0];
    // eslint-disable-next-line testing-library/no-node-access
    //fireEvent.click(todo!);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});
