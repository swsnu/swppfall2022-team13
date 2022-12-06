import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "..";

export interface PetitionType {
  id: number;
  title: string;
  content: string;
  author: number;
  vote: number;
  photo_url?: string;
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
  const response = await axios.get<PetitionType[]>("http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/");
  return response.data;
});

export const fetchPetition = createAsyncThunk(
  "petition/fetchPetition",
  async (id: PetitionType["id"], { dispatch }) => {
    const response = await axios.get(`http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/${id}/`);
    return response.data ?? null;
  }
);

export const postPetition = createAsyncThunk(
  "petition/postPetition",
  async (td: Pick<PetitionType, "title" | "content" | "author" | "vote" | "photo_url">, { dispatch }) => {
    const response = await axios.post("http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/", td);
    dispatch(petitionActions.addPetition(response.data));
  }
);

export const deletePetition = createAsyncThunk(
  "petition/deletePetition",
  async (id: PetitionType["id"], { dispatch }) => {
    await axios.delete(`http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/${id}/`);
    dispatch(petitionActions.deletePetition({ targetId: id }));
  }
);

export const voteUp = createAsyncThunk(
  "petition/voteUp",
  async (id: PetitionType["id"], { dispatch }) => {
    await axios.put(`http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/${id}/`, 1);
    dispatch(petitionActions.voteUp({ targetId: id }));
  }
);

export const voteDown = createAsyncThunk(
  "petition/voteDown",
  async (id: PetitionType["id"], { dispatch }) => {
    await axios.put(`http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/petition/${id}/`, -1);
    dispatch(petitionActions.voteDown({ targetId: id }));
  }
); 


export const petitionSlice = createSlice({
  name: "petition",
  initialState,
  reducers: {
    voteUp: (state, action: PayloadAction<{ targetId: number }>) => {
      const petition = state.petitions.find((value) => value.id === action.payload.targetId);
      if (petition) {
        petition.vote = petition.vote + 1;
      }
    },
    
    voteDown: (state, action: PayloadAction<{ targetId: number }>) => {
      const petition = state.petitions.find((value) => value.id === action.payload.targetId);
      if (petition) {
        petition.vote = petition.vote - 1;
      }
    },
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
    addPetition: (state, action: PayloadAction<{ title: string; content: string; author: number; vote: number; photo_url: string}>) => {
      const newPetition = {
        id: state.petitions[state.petitions.length - 1].id + 1, // temporary
        title: action.payload.title,
        content: action.payload.content,
        author: action.payload.author,
        vote: action.payload.vote,
        photo_url: action.payload.photo_url,
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