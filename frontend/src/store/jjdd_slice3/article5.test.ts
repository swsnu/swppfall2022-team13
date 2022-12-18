import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { ArticleState } from "./article5";
import { fetchArticles, fetchArticle, deleteArticle} from "./article5";

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

    beforeAll(() => {
      store = configureStore({ reducer: { article: reducer } })
    })
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        articles: [],
        selectedArticle: null
      })
    })

    it("should handle fetchArticles", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [fakeArticle1] });
      await store.dispatch(fetchArticles());
      expect(store.getState().article.articles).toEqual([fakeArticle1]);
    });
    it('should handle fetchArticle', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: fakeArticle1 })
      await store.dispatch(fetchArticle(1))
      expect(store.getState().article.selectedArticle).toEqual(fakeArticle1)
    })

    it("should handle deleteArticle", async () => {
      axios.delete = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(deleteArticle(1));
      expect(store.getState().article.articles).toEqual([]);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchArticle(1));
      expect(store.getState().article.selectedArticle).toEqual(null);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchArticle(2));
      expect(store.getState().article.selectedArticle).toEqual(null);
    });
 
  })