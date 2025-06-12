import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bankApi } from '../../api/bankApi';
import { Account } from '../../types';

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
  async (customerId: number, { rejectWithValue }) => {
    try {
      const accounts = await bankApi.getAccounts(customerId);
      return accounts;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch accounts');
    }
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearAccountError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearAccountError } = accountSlice.actions;
export default accountSlice.reducer;