import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bankApi } from '../../api/bankApi';
import { Transaction, TransactionDTO } from '../../types';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  transferSuccess: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  transferSuccess: false
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (accountId: number, { rejectWithValue }) => {
    try {
      const transactions = await bankApi.getTransactions(accountId);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch transactions');
    }
  }
);

export const transferFunds = createAsyncThunk(
  'transactions/transferFunds',
  async (transactionData: TransactionDTO, { rejectWithValue }) => {
    try {
      const result = await bankApi.transfer(transactionData);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Transfer failed');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
    resetTransferSuccess: (state) => {
      state.transferSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Transfer Funds
      .addCase(transferFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transferSuccess = false;
      })
      .addCase(transferFunds.fulfilled, (state) => {
        state.loading = false;
        state.transferSuccess = true;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.transferSuccess = false;
      });
  }
});

export const { clearTransactionError, resetTransferSuccess } = transactionSlice.actions;
export default transactionSlice.reducer;