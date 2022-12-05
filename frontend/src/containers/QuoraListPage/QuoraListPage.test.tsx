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

const stubInitialState: ArticleState = {
  articles: [
    {
      id: 1,
      title: "ang gimochi",
      content: "ang gimochi",
      datetime: "ang gimochi",
      preview_prologue: "ang gimochi",
      detail_link_postfix: "ang gimochi",
      preview_img_path: "ang gimochi",
      detail_img_path: "ang gimochi",
      journal_name: "한겨레",
      detail_text: "ang gimochi",
      created_at: "ang gimochi",
      updated_at: "ang gimochi",
    },
    {
      id: 2,
      title: "ang gimochi",
      content: "ang gimochi",
      datetime: "ang gimochi",
      preview_prologue: "ang gimochi",
      detail_link_postfix: "ang gimochi",
      preview_img_path: "ang gimochi",
      detail_img_path: "ang gimochi",
      journal_name: "조선일보",
      detail_text: "ang gimochi",
      created_at: "ang gimochi",
      updated_at: "ang gimochi",
    },
  ],
  selectedArticle: null,
};

const stubInitialState2: PoliticianState = {
  politicians: [
    {
      id: 1,
      name: "ang gimochi",
      birth_date: "ang gimochi",
      job: "ang gimochi",
      image_src: "ang gimochi",
      political_party: "ang gimochi",
      election_precinct: "ang gimochi",
      committee: "ang gimochi",
      committees: "ang gimochi",
      reelection: "ang gimochi",
      election_units: "ang gimochi",
      email: "ang gimochi",
      career_summary: "ang gimochi",
      mona_code: "ang gimochi",
      proposals: "test",
    },
  ],
  selectedPolitician: null,
};
const stubInitialState3: PetitionState = {
  petitions: [
    {
      id: 1,
      title: "ang gimochi",
      content: "ang gimochi",
      author: 1,
      vote: 1,
      photo_url: "test",
    },
  ],
  selectedPetition: null,
};

const stubInitialState4: QuoraState = {
  quoras: [
    {
      id: 1,
      title: "ang gimochi",
      content: "ang gimochi",
      author: 1,
    },
  ],
  selectedQuora: null,
};

const stubInitialState5: UserType = {
  email: "",
  pw: ""
}

const mockStore = getMockStore({
article: stubInitialState,
politician: stubInitialState2,
petition: stubInitialState3,
quora: stubInitialState4,
user: stubInitialState5
}
);

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
