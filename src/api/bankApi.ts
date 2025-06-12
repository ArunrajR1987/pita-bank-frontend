import api from './axios';
import { Account, Transaction, TransactionDTO } from '../types';

export const bankApi = {
  getBalance: async (id: number): Promise<number> => {
    const response = await api.get<number>(`/bank/balance/${id}`);
    return response.data;
  },
  
  transfer: async (transactionData: TransactionDTO): Promise<string> => {
    const response = await api.post<string>('/bank/transfer', null, {
      params: {
        senderId: transactionData.senderAccountId,
        receiverId: transactionData.receiverAccountId,
        amount: transactionData.amount
      }
    });
    return response.data;
  },
  
  getAccounts: async (customerId: number): Promise<Account[]> => {
    const response = await api.get<Account[]>(`/bank/accounts/${customerId}`);
    return response.data;
  },
  
  getTransactions: async (accountId: number): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>(`/bank/transactions/${accountId}`);
    return response.data;
  }
};