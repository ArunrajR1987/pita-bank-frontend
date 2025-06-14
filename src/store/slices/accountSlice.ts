import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bankApi } from '../../api/bankApi';

interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null
};

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bankApi.get('/accounts');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch accounts';
      return rejectWithValue(errorMessage);
    }
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.accounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default accountSlice.reducer;