import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const notify = () => toast.success("Fresh News.");
// Async thunk to create news
export const createNews = createAsyncThunk(
  "news/create",
  async (newsData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/news",
        newsData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create news"
      );
    }
  }
);

// Fetch all news
export const fetchNews = createAsyncThunk(
  "news/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/news");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch news"
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNews: (state, action) => {
      state.newsList.unshift(action.payload);
      notify();
      // Prepend new news to the list
    },
  },
  extraReducers: (builder) => {
    builder
      // Create News
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList.unshift(action.payload); // Add new news at the top
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNews } = newsSlice.actions;
export default newsSlice.reducer;
