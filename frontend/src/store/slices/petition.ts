import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "..";

export interface PetitionType {
  id: number;
  title: string;
  content: string;
  author: number;
  vote: number;
}

export interface PetitionState {
    petitions: PetitionType[];
  selectedPetition: PetitionType | null;
}

const initialState: PetitionState = {
    petitions: [],
  selectedPetition: null,
};

export const fetchPetitions = createAsyncThunk("petition/fetchPetitions", async () => {
  const response = await axios.get<PetitionType[]>("/api/petition/");
  return response.data;
});

export const fetchPetition = createAsyncThunk(
  "petition/fetchPetition",
  async (id: PetitionType["id"], { dispatch }) => {
    const response = await axios.get(`/api/petition/${id}/`);
    return response.data ?? null;
  }
);

export const postPetition = createAsyncThunk(
  "petition/postPetition",
  async (td: Pick<PetitionType, "title" | "content" | "author" | "vote">, { dispatch }) => {
    const response = await axios.post("/api/petition/", td);
    dispatch(petitionActions.addPetition(response.data));
  }
);

export const deletePetition = createAsyncThunk(
  "petition/deletePetition",
  async (id: PetitionType["id"], { dispatch }) => {
    await axios.delete(`/api/petition/${id}/`);
    dispatch(petitionActions.deletePetition({ targetId: id }));
  }
);


export const petitionSlice = createSlice({
  name: "petition",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ petitions: PetitionType[] }>) => {},
    getPetition: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.petitions.find(
        (td) => td.id === action.payload.targetId
      );
      state.selectedPetition = target ?? null;
    },

    deletePetition: (state, action: PayloadAction<{ targetId: number }>) => {
      state.petitions = state.petitions.filter((petition) => {
        return petition.id !== action.payload.targetId;
      });
    },
    addPetition: (state, action: PayloadAction<{ title: string; content: string; author: number; vote: number}>) => {
      const newPetition = {
        id: state.petitions[state.petitions.length - 1].id + 1, // temporary
        title: action.payload.title,
        content: action.payload.content,
        author: action.payload.author,
        vote: action.payload.vote,
      };
      state.petitions.push(newPetition);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPetitions.fulfilled, (state, action) => {
      // Add user to the state array
      state.petitions = action.payload;
    });
    builder.addCase(fetchPetition.fulfilled, (state, action) => {
      state.selectedPetition = action.payload;
    });
    builder.addCase(postPetition.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const petitionActions = petitionSlice.actions;
export const selectPetition = (state: RootState) => state.petition;

export default petitionSlice.reducer;