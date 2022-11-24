import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { PetitionState } from "./petition";
import { fetchPetitions, fetchPetition, deletePetition, postPetition, voteUp, voteDown} from "./petition";

describe('book reducer', () => {
    let store: EnhancedStore<{ petition: PetitionState }, AnyAction, [ThunkMiddleware<{ petition: PetitionState }, AnyAction, undefined>]>
    const fakePetition1 = {
      id: 1,
      title: "ang gimochi",
      content: "ang gimochi",
      author: 1,
      vote: 1,
      photo_url: "ang gimochi",
    }

    const fakePetition2 = {
      author: 1,
      content: "ang gimochi",
      id: 1,
      photo_url: "ang gimochi",
      title: "ang gimochi",
      vote: 1,
    }

    beforeAll(() => {
      store = configureStore({ reducer: { petition: reducer } })
    })
  
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        petitions: [],
        selectedPetition: null
      })
    })

    it("should handle fetchArticles", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [fakePetition1] });
      await store.dispatch(fetchPetitions());
      expect(store.getState().petition.petitions).toEqual([fakePetition1]);
    });
    it('should handle fetchArticle', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: fakePetition1 })
      await store.dispatch(fetchPetition(1))
      expect(store.getState().petition.selectedPetition).toEqual(fakePetition1)
    })

    it("should handle deleteArticle", async () => {
      axios.delete = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(deletePetition(1));
      expect(store.getState().petition.petitions).toEqual([]);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchPetition(1));
      expect(store.getState().petition.selectedPetition).toEqual(null);
    });

    it("should handle null on fetchArticle", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: null });
      await store.dispatch(fetchPetition(2));
      expect(store.getState().petition.selectedPetition).toEqual(null);
    });

    it("should handle error on postTodo", async () => {
      const mockConsoleError = jest.fn();
      console.error = mockConsoleError;
      jest.spyOn(axios, "post").mockRejectedValue({
        response: { data: { title: ["error"] } },
      });
      await store.dispatch(postPetition({ title: "ang gimochi", content: "ang gimochi", author: 1, vote: 1, photo_url: "ang gimochi"}));
      expect(mockConsoleError).toBeCalled();
    });

    it("should handle postTodo", async () => {
      jest.spyOn(axios, "post").mockResolvedValue({
        data: fakePetition1,
      });
      await store.dispatch(postPetition({ title: "ang gimochi", content: "ang gimochi", author: 1, vote: 1, photo_url: "ang gimochi"}));
      expect(store.getState().petition.petitions).toEqual([]);
    });

    it("should handle voteUp", async () => {
      jest.spyOn(axios, "put").mockResolvedValue({
        data: fakePetition1,
      });
      await store.dispatch(voteUp(fakePetition1.id));
      expect(store.getState().petition.petitions.find((v) => v.id === fakePetition1.id)?.vote).toEqual(undefined);
    });

    it("should handle voteDown", async () => {
      jest.spyOn(axios, "put").mockResolvedValue({
        data: fakePetition1,
      });
      await store.dispatch(voteDown(fakePetition1.id));
      expect(store.getState().petition.petitions.find((v) => v.id === fakePetition1.id)?.vote).toEqual(undefined);
    });
 
  })

  //yarn test --coverage --watchAll=false