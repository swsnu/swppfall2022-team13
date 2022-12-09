import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { QuoraState } from "./quora";
import { fetchQuoras, fetchQuora, deleteQuora, postQuora} from "./quora";

describe('book reducer', () => {
    let store: EnhancedStore<{ quora: QuoraState }, AnyAction, [ThunkMiddleware<{ quora: QuoraState }, AnyAction, undefined>]>
    const fakeQuora1 = {
        id: 1,
        title: "ang gimochi",
        content: "ang gimochi",
        author: 1,
        author_politicianId: 1,
    }

    const fakeQuora2 = {
      id: 2,
      title: "ang gimochi",
      content: "ang gimochi",
      author: 2,
      author_politicianId: 2,
    }

    beforeAll(() => {
      store = configureStore({ reducer: { quora: reducer } })
    })
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        quoras: [],
        selectedQuora: null
      })
    })

    it("should handle fetchQuoras", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [fakeQuora1] });
      await store.dispatch(fetchQuoras());
      expect(store.getState().quora.quoras).toEqual([fakeQuora1]);
    });
    it('should handle fetchQuora', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: fakeQuora1 })
      await store.dispatch(fetchQuora(1))
      expect(store.getState().quora.selectedQuora).toEqual(fakeQuora1)
    })

    it("should handle deleteQuora", async () => {
      axios.delete = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(deleteQuora(1));
      expect(store.getState().quora.quoras).toEqual([]);
    });

    it("should handle null on fetchQuora", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchQuora(1));
      expect(store.getState().quora.selectedQuora).toEqual(null);
    });

    it("should handle null on fetchQuora", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchQuora(2));
      expect(store.getState().quora.selectedQuora).toEqual(null);
    });

    it("should handle error on postQuora", async () => {
      const mockConsoleError = jest.fn();
      console.error = mockConsoleError;
      jest.spyOn(axios, "post").mockRejectedValue({
        response: { data: { title: ["error"] } },
      });
      await store.dispatch(postQuora({
        title: "ang gimochi",
        content: "ang gimochi",
        author: 1,
        author_politicianId: 1,}));
      expect(mockConsoleError).toBeCalled();
    });

    it("should handle postQuora", async () => {
      jest.spyOn(axios, "post").mockResolvedValue({
        data: fakeQuora1,
      });
      await store.dispatch(postQuora({
        title: "ang gimochi",
        content: "ang gimochi",
        author: 1,
        author_politicianId: 1,}));
      expect(store.getState().quora.quoras).toEqual([]);
    });

 
  })

  //yarn test --coverage --watchAll=false