import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service";

interface AuthState {
  user: { token: string } | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        console.log("FIRE");
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
