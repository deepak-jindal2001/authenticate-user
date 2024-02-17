import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosHandler from "../../axiosInstance";

interface AuthState {
  token: string;
  isLoading: boolean;
  error: string;
}

interface AuthRequest {
  email: string;
  password: string;
}

const initialState: AuthState = {
  token: "",
  isLoading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await axiosHandler.post("/api/login", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error || error?.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await axiosHandler.post("/api/register", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error || error?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = "";
      state.token = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isLoading = false;
    });
    builder.addCase(signupUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
