import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bankApi } from '../../api/bankApi';

interface Account {
  id: string;
  accountNumber: string;
  accountType: string;
}

interface Transaction {
  id: string;
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  type: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  fromAccount?: Account;
  toAccount?: Account;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

interface CreateTransactionPayload {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bankApi.get('/transactions');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch transactions';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData: CreateTransactionPayload, { rejectWithValue }) => {
    try {
      const response = await bankApi.post('/transactions', transactionData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to create transaction';
      return rejectWithValue(errorMessage);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.transactions = [action.payload, ...state.transactions];
        state.loading = false;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default transactionSlice.reducer;