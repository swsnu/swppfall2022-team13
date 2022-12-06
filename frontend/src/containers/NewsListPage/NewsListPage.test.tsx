import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { PetitionState } from "../../store/slices/petition";
import { UserType } from "../../store/slices/user";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import NewsListPage from "./NewsListPage";
import NewsArticle, {
  NewsArticleType,
} from "../../components/NewsArticle/NewsArticle";
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

describe("<NewsListPage />", () => {
  let articleList: JSX.Element;
  beforeEach(() => {
    jest.clearAllMocks();
    articleList = (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<NewsListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  it("should render TodoList", () => {
    const { container } = render(articleList);
    expect(container).toBeTruthy();
  });
  it("should render todos", () => {
    render(articleList);
    const articles = screen.getAllByTestId("spyArticle");
    expect(articles).toHaveLength(2);
  });
  it("should handle click", () => {
    render(articleList);
    const todos = screen.getAllByTestId("spyArticle");
    const todo = todos[0];
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(todo!);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});
