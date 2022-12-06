import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import PoliticianDetailPage from "./PoliticianDetailPage";

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

const renderPoliticianDetailPage = (id: string) => {
  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path="/politician/:id" element={<PoliticianDetailPage />} />
        <Route path="*" element={<Navigate to={"/politician/" + id} />} />
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
              id: 1,
              name: "test",
              birth_date: "test",
              job: "test",
              image_src: "test",
              political_party: "test",
              election_precinct: "test",
              committee: "test",
              committees: "test",
              reelection: "초선",
              election_units: "test",
              email: "test",
              career_summary: "학력\r\n 상문고등학교\r\n 서울대학교 \r\n",
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
              reelection: "재선",
              election_units: "test",
              email: "test",
              career_summary: "학력\r\n 상문고등학교\r\n 서울대학교 \r\n",
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
              reelection: "3선",
              election_units: "test",
              email: "test",
              career_summary: "학력\r\n 상문고등학교\r\n 서울대학교 \r\n",
              mona_code: "test",
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
        comment: {
          comments: [
            {
              id: 1,
              quora_id: 1,
              author_id: 1,
              content: "ang gimochi",
            },
          ],
          selectedComment: null,
        },
        
        user: {
          email: "",
          pw: ""
        }
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
          proposals: "test",
        },
      });
    });
    renderPoliticianDetailPage("3");
    await screen.findAllByText("test");
    await screen.findByText("상문고등학교");
  });

  it("test when reelection = 2", async () => {
    renderPoliticianDetailPage("2");
    await screen.findAllByText("test");
    await screen.findByText("상문고등학교");
  });

  it("test when reelection = 1", async () => {
    renderPoliticianDetailPage("1");
    await screen.findAllByText("test");
    await screen.findByText("상문고등학교");
  });
  it("test career and props", async () => {
    renderPoliticianDetailPage("1");
    const career = screen.getByAltText("career");
    const props = screen.getByAltText("props");
    fireEvent.click(career);
    fireEvent.click(props);
  });
});
