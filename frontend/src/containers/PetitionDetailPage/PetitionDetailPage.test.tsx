import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { PetitionState } from "../../store/slices/petition";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import PetitionDetailPage from "./PetitionDetailPage";
import { fetchPetitions, fetchPetition, selectPetition } from "../../store/slices/petition";
import Petition, { PetitionType,} from "../../components/Petition/Petition";

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


const spyNavBar = () => <p>NavBar</p>
jest.mock('../../components/NavBar/NavBar', () => spyNavBar)




const renderPetitionDetailPage = () => {

  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route path="/petition/:id" element={<PetitionDetailPage />} />
        <Route path="*" element={<Navigate to={"/petition/3"} />} />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        article: {
          articles: [
            { id: 3,
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
                },
            ],
            selectedPolitician: null,
        },

        petition: {
          petitions: [
              {
                id: 3,
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

const renderPetitionDetailPage2 = () => {

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/petition/:id" element={<PetitionDetailPage />} />
          <Route path="*" element={<Navigate to={"/petition/2"} />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          article: {
            articles: [
              { id: 3,
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
                  },
              ],
              selectedPolitician: null,
          },

          petition: {
            petitions: [
                {
                  id: 3,
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

describe("<PetitionDetailPage />", () => {

    

  it("should render without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi",
          author: 1,
          vote: 1,
          photo_url: "test",
        },
      });
    });
    renderPetitionDetailPage();
    //await screen.findByText("Current Vote Counts:");
    //await screen.findByText("ang gimochi");
  });

  it("should not render if there is no article", async () => {
    renderPetitionDetailPage2();
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
          content: "ang gimochi",
          author: 1,
          vote: 1,
          photo_url: "test",
        },
      });
    });
    renderPetitionDetailPage();
    const backButton = await screen.findByText("Back");
    fireEvent.click(backButton);
  });

  it("should render Vote buttons without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi",
          author: 1,
          vote: 1,
          photo_url: "test",
        },
      });
    });
    renderPetitionDetailPage();
    const voteButton = await screen.findByText("Vote!");
    fireEvent.click(voteButton);
  });

  it("should render Copy buttons without errors", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {
          id: 3,
          title: "ang gimochi",
          content: "ang gimochi",
          author: 1,
          vote: 1,
          photo_url: "test",
        },
      });
    });
    renderPetitionDetailPage();
    window.alert = jest.fn();
    await screen.findByText("Delete Petition");
    const delButton = await screen.findByText("Delete Petition");
    fireEvent.click(delButton);
  });


  
});
