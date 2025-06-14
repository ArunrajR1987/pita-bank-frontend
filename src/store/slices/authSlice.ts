import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import axiosInstance from '../../api/axios';
import { storeToken, removeToken } from '../../utils/tokenStorage';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: sessionStorage.getItem('token'),
  isAuthenticated: !!sessionStorage.getItem('token'),
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.post('/login', credentials);
      // Use the dedicated token storage utility
      if (response.data && response.data.token) {
        storeToken(response.data.token);
      }
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      // Use axiosInstance directly to have more control over the response
      const response = await axiosInstance.post('/auth/register', userData);
      console.log('Register API response:', response);
      
      // Make sure we're storing the token correctly
      if (response.data && response.data.token) {
        // Use the dedicated token storage utility
        storeToken(response.data.token);
      } else {
        console.error('No token received in register response:', response.data);
      }
      return response.data;
    } catch (error: any) {
      console.error('Register API error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.get('/me');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to get user';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Use the dedicated token storage utility
    removeToken();
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        console.log('Register fulfilled with payload:', action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        
        // Double-check token storage
        if (action.payload.token) {
          // Use the dedicated token storage utility
          storeToken(action.payload.token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        // Use the dedicated token storage utility
        removeToken();
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;