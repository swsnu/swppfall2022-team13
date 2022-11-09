import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "..";

export interface ArticleType {
  id: number;
  title: string;
  content?: string;
  datetime_str: any;
  preview_prologue: string;
  detail_link_postfix: string;
  preview_img_path: string;
  detail_img_path: string;
  journal_name: string;
  detail_text: string;
  created_at?: any;
  updated_at?: any;
}

export interface ArticleState {
    articles: ArticleType[];
  selectedArticle: ArticleType | null;
}

const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
};

export const fetchArticles = createAsyncThunk("article/fetchArticles", async () => {
  const response = await axios.get<ArticleType[]>("/api/article/");
  return response.data;
});

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (id: ArticleType["id"], { dispatch }) => {
    const response = await axios.get(`/api/article/${id}/`);
    return response.data ?? null;
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (id: ArticleType["id"], { dispatch }) => {
    await axios.delete(`/api/article/${id}/`);
    dispatch(articleActions.deleteArticle({ targetId: id }));
  }
);


export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ articles: ArticleType[] }>) => {},
    getArticle: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.articles.find(
        (td) => td.id === action.payload.targetId
      );
      state.selectedArticle = target ?? null;
    },

    deleteArticle: (state, action: PayloadAction<{ targetId: number }>) => {
      state.articles = state.articles.filter((article) => {
        return article.id !== action.payload.targetId;
      });
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      // Add user to the state array
      state.articles = action.payload;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.selectedArticle = action.payload;
    });
  },
});

export const articleActions = articleSlice.actions;
export const selectArticle = (state: RootState) => state.article;

export default articleSlice.reducer;