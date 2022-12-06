import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "..";

export interface CommentType {
  id: number;
  quora_id: number;
  author_id: number;
  content: string;
}

export interface CommentState {
    comments: CommentType[];
  selectedComment: CommentType | null;
}

const initialState: CommentState = {
    comments: [],
    selectedComment: null,
};

export const fetchComments = createAsyncThunk("comment/fetchComments", async () => {
  const response = await axios.get<CommentType[]>("/api/comment/");
  return response.data;
});

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (id: CommentType["id"], { dispatch }) => {
    const response = await axios.get(`/api/comment/${id}/`);
    return response.data ?? null;
  }
);

export const postComment = createAsyncThunk(
  "comment/postComment",
  async (td: Pick<CommentType, "quora_id" | "author_id" | "content">, { dispatch }) => {
    const response = await axios.post("/api/comment/", td);
    dispatch(commentActions.addComment(response.data));
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteCOmment",
  async (id: CommentType["id"], { dispatch }) => {
    await axios.delete(`/api/comment/${id}/`);
    dispatch(commentActions.deleteComment({ targetId: id }));
  }
);


export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    
    getAll: (state, action: PayloadAction<{ comments: CommentType[] }>) => {},
    getComment: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.comments.find(
        (td) => td.id === action.payload.targetId
      );
      state.selectedComment = target ?? null;
    },

    deleteComment: (state, action: PayloadAction<{ targetId: number }>) => {
      state.comments = state.comments.filter((comment) => {
        return comment.id !== action.payload.targetId;
      });
    },
    addComment: (state, action: PayloadAction<{ quora_id: number; author_id: number; content: string;}>) => {
      const newComment = {
        id: state.comments[state.comments.length - 1].id + 1, // temporary
        quora_id: action.payload.quora_id,
        author_id: action.payload.author_id,
        content: action.payload.content,
      };
      state.comments.push(newComment);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      // Add user to the state array
      state.comments = action.payload;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.selectedComment = action.payload;
    });
    builder.addCase(postComment.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const commentActions = commentSlice.actions;
export const selectComment = (state: RootState) => state.comment;

export default commentSlice.reducer;