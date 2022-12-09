import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { CommentState } from "./comment";
import { fetchComments, fetchComment, deleteComment, postComment} from "./comment";

describe('book reducer', () => {
    let store: EnhancedStore<{ comment: CommentState }, AnyAction, [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]>
    const fakeComment1 = {
      id: 1,
      quora_id: 1,
      author_id: 1,
      content: "test",
    }


    beforeAll(() => {
      store = configureStore({ reducer: { comment: reducer } })
    })
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        comments: [],
        selectedComment: null
      })
    })

    it("should handle fetchArticles", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [fakeComment1] });
      await store.dispatch(fetchComments());
      expect(store.getState().comment.comments).toEqual([fakeComment1]);
    });
    it('should handle fetchArticle', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: fakeComment1 })
      await store.dispatch(fetchComment(1))
      expect(store.getState().comment.selectedComment).toEqual(fakeComment1)
    })

    it("should handle deleteArticle", async () => {
      axios.delete = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(deleteComment(1));
      expect(store.getState().comment.comments).toEqual([]);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchComment(1));
      expect(store.getState().comment.selectedComment).toEqual(null);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchComment(2));
      expect(store.getState().comment.selectedComment).toEqual(null);
    });

    it("should handle error on postTodo", async () => {
      const mockConsoleError = jest.fn();
      console.error = mockConsoleError;
      jest.spyOn(axios, "post").mockRejectedValue({
        response: { data: { title: ["error"] } },
      });
      await store.dispatch(postComment({
        quora_id: 1,
        author_id: 1,
        content: "test"}));
      expect(mockConsoleError).toBeCalled();
    });

    it("should handle postTodo", async () => {
      jest.spyOn(axios, "post").mockResolvedValue({
        data: fakeComment1,
      });
      await store.dispatch(postComment({
        quora_id: 1,
        author_id: 1,
        content: "test"}));
      expect(store.getState().comment.comments).toEqual([]);
    });

 
  })

  //yarn test --coverage --watchAll=false