import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { PoliticianState } from "./politician";
import { fetchPolitician, fetchPoliticians } from "./politician";

describe("politician reducer", () => {
  let store: EnhancedStore<
    { politician: PoliticianState },
    AnyAction,
    [ThunkMiddleware<{ politician: PoliticianState }, AnyAction, undefined>]
  >;
  const fakePolitician = {
    id: 1,
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
    career_summary: "test",
    mona_code: "test",
  };

  beforeAll(() => {
    store = configureStore({ reducer: { politician: reducer } });
  });

  it("should handle initial politician state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      politicians: [],
      selectedPolitician: null,
    });
  });

  it("should handle fetchPoliticians", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [fakePolitician] });
    await store.dispatch(fetchPoliticians());
    expect(store.getState().politician.politicians).toEqual([fakePolitician]);
  });
  it("should handle fetchPolitician", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: fakePolitician });
    await store.dispatch(fetchPolitician(1));
    expect(store.getState().politician.selectedPolitician).toEqual(
      fakePolitician
    );
  });

  it("should handle null on fetchPolitician", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null });
    await store.dispatch(fetchPolitician(1));
    expect(store.getState().politician.selectedPolitician).toEqual(null);
  });

  it("should handle null on fetchPolitician", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null });
    await store.dispatch(fetchPolitician(2));
    expect(store.getState().politician.selectedPolitician).toEqual(null);
  });
});
