import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export interface PoliticianType {
  id: number;
  name: string;
  birth_date: string;
  job: string;
  image_src: string;
  political_party: string;
  election_precinct: string;
  committee: string;
  committees: string;
  reelection: string;
  election_units: string;
  email: string;
  career_summary: string;
  mona_code: string;
  proposals: string;
}

export interface PoliticianState {
  politicians: PoliticianType[];
  selectedPolitician: PoliticianType | null;
}

const initialState: PoliticianState = {
  politicians: [],
  selectedPolitician: null,
};

const politician_url =
  "http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/politician/";

export const fetchPoliticians = createAsyncThunk(
  "politician/fetchPoliticians",
  async () => {
    const response = await axios.get<PoliticianType[]>(politician_url);
    return response.data;
  }
);

export const fetchPolitician = createAsyncThunk(
  "politician/fetchPolitician",
  async (id: PoliticianType["id"], { dispatch }) => {
    const response = await axios.get(`${politician_url}${id}`);
    return response.data ?? null;
  }
);

export const politicianSlice = createSlice({
  name: "politician",
  initialState,
  reducers: {
    // getAll: (
    //   state,
    //   action: PayloadAction<{ politicians: PoliticianType[] }>
    // ) => {},
    // getPolitician: (state, action: PayloadAction<{ targetId: number }>) => {
    //   const target = state.politicians.find(
    //     (td) => td.id === action.payload.targetId
    //   );
    //   state.selectedPolitician = target ?? null;
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPoliticians.fulfilled, (state, action) => {
      // Add user to the state array
      state.politicians = action.payload;
    });
    builder.addCase(fetchPolitician.fulfilled, (state, action) => {
      state.selectedPolitician = action.payload;
    });
  },
});

export const politicianActions = politicianSlice.actions;
export const selectPolitician = (state: RootState) => state.politician;

export default politicianSlice.reducer;
