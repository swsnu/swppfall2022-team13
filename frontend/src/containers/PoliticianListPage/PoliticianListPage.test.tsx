import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { UserType } from "../../store/slices/user";
import { getMockStore } from "../../test-utils/mock";
import PoliticianListPage from "./PoliticianListPage";
import { PoliticianSummaryType } from "../../components/PoliticianSummary/PoliticianSummary";
import { Card, ListGroup } from "react-bootstrap";
import { Provider } from "react-redux";
import { PetitionState } from "../../store/slices/petition";
import { QuoraState } from "../../store/slices/quora";
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

const spyNavBar = () => <p>NavBar</p>;
jest.mock("../../components/NavBar/NavBar", () => spyNavBar);

const politicianStubInitialState: PoliticianState = {
  politicians: [
    {
      id: 1,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 2,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 3,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 4,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 5,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 6,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
    {
      id: 7,
      name: "test",
      birth_date: "test",
      job: "test",
      image_src: "test",
      political_party: "test",
      election_precinct: "test",
      committee: "test",
      committees: "test",
      reelection: "test",
      election_units: "test",
      email: "test",
      career_summary: "test",
      mona_code: "test",
      proposals: "test",
    },
  ],
  selectedPolitician: null,
};

const articleStubInitialState: ArticleState = {
  articles: [
    {
      id: 1,
      title: "test",
      content: "test",
      datetime_str: "test",
      preview_prologue: "test",
      detail_link_postfix: "test",
      preview_img_path: "test",
      detail_img_path: "test",
      journal_name: "?????????",
      detail_text: "test",
      created_at: "test",
      updated_at: "test",
    },
    {
      id: 2,
      title: "test",
      content: "test",
      datetime_str: "test",
      preview_prologue: "test",
      detail_link_postfix: "test",
      preview_img_path: "test",
      detail_img_path: "test",
      journal_name: "????????????",
      detail_text: "test",
      created_at: "test",
      updated_at: "test",
    },
    {
      id: 2,
      title: "test",
      content: "test",
      datetime_str: "test",
      preview_prologue: "test",
      detail_link_postfix: "test",
      preview_img_path: "test",
      detail_img_path: "test",
      journal_name: "????????????",
      detail_text: "test",
      created_at: "test",
      updated_at: "test",
    },
  ],
  selectedArticle: null,
};


const mockStore = getMockStore({
  article: articleStubInitialState,
  politician: politicianStubInitialState,
  petition: stubInitialState3,
  quora: stubInitialState4,
  user: stubInitialState5,
  comment: stubInitialState6
});

describe("<PoliticianListPage />", () => {
  let politicianList: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    politicianList = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<PoliticianListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  it("should render politicianList", () => {
    const { container } = render(politicianList);
    expect(container).toBeTruthy();
  });
  it("should handle searchBar input", () => {
    render(politicianList);
    const search = screen.getByPlaceholderText("Search ..");
    fireEvent.change(search, { target: { value: "test" } });
  });
  it("should handle filter input", () => {
    render(politicianList);
    const filter = screen.getByPlaceholderText("filter");
    fireEvent.change(filter, { target: { value: "???????????? ??????" } });
    fireEvent.change(filter, { target: { value: "???????????? ??????" } });
  });
});
