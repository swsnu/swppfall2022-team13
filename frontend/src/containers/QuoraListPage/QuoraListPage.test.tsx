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
import Quora, {
  QuoraType,
} from "../../components/Quora/Quora";
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

jest.mock(
  "../../components/Quora/Quora",
  () => (props: QuoraType) =>
      (
        <div data-testid="spyQuora">
          <div className="QuorasEach">
          
          <div className="quoraTitle">{props?.title}</div>
          <button className="quoraDetailBtn" type="button" id={props.title} onClick={mockNavigate}><b>Participate</b></button>
          
          <p></p>
          
        </div>
        </div>
      )
  );


const mockStore = getMockStore({
  article: stubInitialState,
  politician: stubInitialState2,
  petition: stubInitialState3,
  quora: stubInitialState4,
  user: stubInitialState5,
  comment: stubInitialState6
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
  it("should render QuoraList", () => {
    const { container } = render(quoraList);
    expect(container).toBeTruthy();
  });
  it("should render quoras", () => {
    render(quoraList);
    const quoras = screen.getAllByTestId("spyQuora");
    expect(quoras).toHaveLength(1);
  });
  it("should handle click", () => {
    render(quoraList);
    const quoras = screen.getAllByTestId("spyQuora");
    const quora = quoras[0];
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(quora!);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  it("should handle click", () => {
    render(quoraList);
    const open = screen.getByText("Open Quora");
    fireEvent.click(open);
  });

  it("should handle click", () => {
    render(quoraList);
    const open = screen.getByText("Open Quora");
    fireEvent.click(open);
    //expect(window.alert).toBeCalledTimes(0);
  });

  it("should handle click", () => {
    render(quoraList);
    const participate = screen.getByText("Participate");
    fireEvent.click(participate);
  });
});

//yarn test --coverage --watchAll=false
