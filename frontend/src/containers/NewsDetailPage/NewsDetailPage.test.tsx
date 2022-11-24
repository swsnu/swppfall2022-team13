import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { PetitionState } from "../../store/slices/petition";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import NewsDetailPage from "./NewsDetailPage";
import {
  fetchArticles,
  fetchArticle,
  selectArticle,
} from "../../store/slices/article";
import NewsArticle, {
  NewsArticleType,
} from "../../components/NewsArticle/NewsArticle";

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
  "../../components/NewsArticle/NewsArticle",
  () => (props: NewsArticleType) =>
    (
      <div data-testid="spyArticle">
        <p>
          <div className="NewsArticleLeft" onClick={mockNavigate}>
            <div className="leftContent">
              <img
                className="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div className="rightContent">
              <div className="title">{props.title}</div>
              <p className="content">{props.preview_prologue}</p>

              <div className="dateContent">
                <text className="card-text">
                  <small className="text-muted">
                    Created: {props?.datetime_str}
                  </small>
                </text>
                &nbsp; &nbsp;
                <text className="card-text">
                  <small className="text-muted">
                    Last updated: {props?.updated_at}
                  </small>
                </text>
              </div>
            </div>
          </div>
        </p>
      </div>
    )
);

const spyNavBar = () => <p>NavBar</p>;
jest.mock("../../components/NavBar/NavBar", () => spyNavBar);

const renderNewsDetailPage = () => {
  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="*" element={<Navigate to={"/news/3"} />} />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        article: {
          articles: [
            {
              id: 3,
              title: "ang gimochi",
              content: "ang gimochi2",
              datetime_str: "ang gimochi",
              preview_prologue: "ang gimochi",
              detail_link_postfix: "ang gimochi",
              preview_img_path: "ang gimochi",
              detail_img_path: "ang gimochi",
              journal_name: "한겨레",
              detail_text: "ang gimochi2",
              created_at: "ang gimochi",
              updated_at: "ang gimochi",
            },
          ],
          selectedArticle: null,
        },

        politician: {
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
        },

        petition: {
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
        },

        quora: {
          quoras: [
            {
              id: 1,
              title: "ang gimochi",
              content: "ang gimochi",
              author: 1,
            },
          ],
          selectedQuora: null,
        },
      },
    }
  );
};

const renderNewsDetailPage2 = () => {
  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="*" element={<Navigate to={"/news/2"} />} />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        article: {
          articles: [
            {
              id: 3,
              title: "ang gimochi",
              content: "ang gimochi2",
              datetime_str: "ang gimochi",
              preview_prologue: "ang gimochi",
              detail_link_postfix: "ang gimochi",
              preview_img_path: "ang gimochi",
              detail_img_path: "ang gimochi",
              journal_name: "한겨레",
              detail_text: "ang gimochi2",
              created_at: "ang gimochi",
              updated_at: "ang gimochi",
            },
          ],
          selectedArticle: null,
        },

        politician: {
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
        },

        petition: {
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
        },

        quora: {
          quoras: [
            {
              id: 1,
              title: "ang gimochi",
              content: "ang gimochi",
              author: 1,
            },
          ],
          selectedQuora: null,
        },
      },
    }
  );
};

describe("<NewsDetailPage />", () => {
  it("should render without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi2",
          datetime_str: "ang gimochi",
          preview_prologue: "ang gimochi",
          detail_link_postfix: "ang gimochi",
          preview_img_path: "ang gimochi",
          detail_img_path: "ang gimochi",
          journal_name: "한겨레",
          detail_text: "ang gimochi2",
          created_at: "ang gimochi",
          updated_at: "ang gimochi",
        },
      });
    });
    renderNewsDetailPage();
    await screen.findByText("ang gimochi");
    await screen.findByText("ang gimochi2");
  });

  it("should not render if there is no article", async () => {
    renderNewsDetailPage2();
    jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.reject());
    expect(screen.queryAllByText("ang gimochi")).toHaveLength(0);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should render Back buttons without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi2",
          datetime_str: "ang gimochi",
          preview_prologue: "ang gimochi",
          detail_link_postfix: "ang gimochi",
          preview_img_path: "ang gimochi",
          detail_img_path: "ang gimochi",
          journal_name: "한겨레",
          detail_text: "ang gimochi2",
          created_at: "ang gimochi",
          updated_at: "ang gimochi",
        },
      });
    });
    renderNewsDetailPage();
    const backButton = await screen.findByText("Back");
    fireEvent.click(backButton);
  });

  it("should render Copy buttons without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi2",
          datetime_str: "ang gimochi",
          preview_prologue: "ang gimochi",
          detail_link_postfix: "ang gimochi",
          preview_img_path: "ang gimochi",
          detail_img_path: "ang gimochi",
          journal_name: "한겨레",
          detail_text: "ang gimochi2",
          created_at: "ang gimochi",
          updated_at: "ang gimochi",
        },
      });
    });
    renderNewsDetailPage();
    window.alert = jest.fn();
    await screen.findByText("Copy Content");
    const cpyButton = await screen.findByText("Copy Content");
    fireEvent.click(cpyButton);
    expect(window.alert).toBeCalled();
  });
});
