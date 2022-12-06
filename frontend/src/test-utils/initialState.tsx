
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ArticleState } from "../store/slices/article";
import { PoliticianState } from "../store/slices/politician";
import { PetitionState } from "../store/slices/petition";
import { UserType } from "../store/slices/user";
import { QuoraState } from "../store/slices/quora";
import { getMockStore } from "../test-utils/mock";



export const stubInitialState: ArticleState = {
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
  
  export const stubInitialState2: PoliticianState = {
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
  export const stubInitialState3: PetitionState = {
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
  
  export const stubInitialState4: QuoraState = {
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
  
  export const stubInitialState5: UserType = {
      email: "",
      pw: ""
  }
  
  export const mockStore = getMockStore({
    article: stubInitialState,
    politician: stubInitialState2,
    petition: stubInitialState3,
    quora: stubInitialState4,
    user: stubInitialState5
    }
  );