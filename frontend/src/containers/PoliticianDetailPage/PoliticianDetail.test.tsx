import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { getMockStore } from "../../test-utils/mock";
import PoliticianDetailPage from "./PoliticianDetailPage";
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

const spyNavBar = () => <p>NavBar</p>;
jest.mock("../../components/NavBar/NavBar", () => spyNavBar);

const renderPoliticianDetailPage = () => {
  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path="/politician/:id" element={<PoliticianDetailPage />} />
        <Route path="*" element={<Navigate to={"/politician/3"} />} />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        article: {
          articles: [
            {
              id: 3,
              title: "test",
              content: "test2",
              datetime_str: "test",
              preview_prologue: "test",
              detail_link_postfix: "test",
              preview_img_path: "test",
              detail_img_path: "test",
              journal_name: "한겨레",
              detail_text: "test2",
              created_at: "test",
              updated_at: "test",
            },
          ],
          selectedArticle: null,
        },

        politician: {
          politicians: [
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
              career_summary: "학력\r\n 상문고등학교\r\n 서울대학교 \r\n",
              mona_code: "test",
            },
          ],
          selectedPolitician: null,
        },
      },
    }
  );
};

describe("<PoliticianDetailPage />", () => {
  it("should render without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
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
          career_summary: "학력\r\n 상문고등학교\r\n 서울대학교 \r\n",
          mona_code: "test",
        },
      });
    });
    renderPoliticianDetailPage();
    await screen.findAllByText("test");
    await screen.findByText("상문고등학교");
  });

  it("should not render if there is no politician", async () => {
    renderPoliticianDetailPage();
    jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.reject());
    expect(screen.queryAllByText("test")).toHaveLength(1);
  });
});
