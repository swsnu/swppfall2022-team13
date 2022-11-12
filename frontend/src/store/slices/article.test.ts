import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { ArticleState } from "./article";
import { fetchArticles, fetchArticle, deleteArticle} from "./article";

describe('book reducer', () => {
    let store: EnhancedStore<{ article: ArticleState }, AnyAction, [ThunkMiddleware<{ article: ArticleState }, AnyAction, undefined>]>
    const fakeArticle1 = {
        id: 1,
        title: "ang gimochi",
        content: "ang gimochi",
        datetime_str: "ang gimochi",
        preview_prologue: "ang gimochi",
        detail_link_postfix: "ang gimochi",
        preview_img_path: "ang gimochi",
        detail_img_path: "ang gimochi",
        journal_name: "ang gimochi",
        detail_text: "ang gimochi",
        created_at: "ang gimochi",
        updated_at: "ang gimochi",
    }
    const fakeArticle2 = {
        id: 2,
        title: "ang gimochi",
        content: "ang gimochi",
        datetime_str: "ang gimochi",
        preview_prologue: "ang gimochi",
        detail_link_postfix: "ang gimochi",
        preview_img_path: "ang gimochi",
        detail_img_path: "ang gimochi",
        journal_name: "ang gimochi",
        detail_text: "ang gimochi",
        created_at: "ang gimochi",
        updated_at: "ang gimochi",
    }
    beforeAll(() => {
      store = configureStore({ reducer: { article: reducer } })
    })
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        articles: [],
        selectedArticle: null
      })
    })
    it('should handle fetchArticle', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [fakeArticle1] })
      await store.dispatch(fetchArticle(1))
      expect(store.getState().article.selectedArticle).toEqual([fakeArticle1])
    })
 
  })