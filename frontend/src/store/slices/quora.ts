import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "..";

export interface QuoraType {
  id: number;
  title: string;
  content: string;
  author: number;
  author_politicianId: number;
}

export interface QuoraState {
  quoras: QuoraType[];
  selectedQuora: QuoraType | null;
}

const initialState: QuoraState = {
  quoras: [],
  selectedQuora: null,
};

export const fetchQuoras = createAsyncThunk("quora/fetchQuoras", async () => {
  const response = await axios.get<QuoraType[]>("/api/quora/");
  //const response = await axios.get<QuoraType[]>("/api/quora/");
  return response.data;
});

export const fetchQuora = createAsyncThunk(
  "quora/fetchQuora",
  async (id: QuoraType["id"], { dispatch }) => {
    const response = await axios.get(`/api/quora/${id}/`);
    //const response = await axios.get(`/api/quora/${id}/`);
    return response.data ?? null;
  }
);

export const postQuora = createAsyncThunk(
  "quora/postQuora",
  async (td: Pick<QuoraType, "title" | "content" | "author" | "author_politicianId">, { dispatch }) => {
    const response = await axios.post("/api/quora/", td);
    //const response = await axios.post("/api/quora/", td);
    dispatch(quoraActions.addQuora(response.data));
  }
);

export const deleteQuora = createAsyncThunk(
  "quora/deleteQuora",
  async (id: QuoraType["id"], { dispatch }) => {
    await axios.delete(`/api/quora/${id}/`);
    //await axios.delete(`/api/quora/${id}/`);
    dispatch(quoraActions.deleteQuora({ targetId: id }));
  }
);


export const quoraSlice = createSlice({
  name: "quora",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ quoras: QuoraType[] }>) => {},
    getQuora: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.quoras.find(
        (td) => td.id === action.payload.targetId
      );
      state.selectedQuora = target ?? null;
    },

    deleteQuora: (state, action: PayloadAction<{ targetId: number }>) => {
      state.quoras = state.quoras.filter((quora) => {
        return quora.id !== action.payload.targetId;
      });
    },
    addQuora: (state, action: PayloadAction<{ title: string; content: string; author: number; author_politicianId: number;}>) => {
      const newQuora = {
        id: state.quoras[state.quoras.length - 1].id + 1, // temporary
        title: action.payload.title,
        content: action.payload.content,
        author: action.payload.author,
        author_politicianId: action.payload.author_politicianId,
      };
      state.quoras.push(newQuora);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchQuoras.fulfilled, (state, action) => {
      // Add user to the state array
      state.quoras = action.payload;
    });
    builder.addCase(fetchQuora.fulfilled, (state, action) => {
      state.selectedQuora = action.payload;
    });
    builder.addCase(postQuora.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const quoraActions = quoraSlice.actions;
export const selectQuora = (state: RootState) => state.quora;

export default quoraSlice.reducer;