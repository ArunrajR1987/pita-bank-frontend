// Auth types
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  username: string;
  balance: number;
  kycVerified: boolean;
  roles: string[];
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Account types
export enum AccountType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING'
}

export interface Account {
  id: number;
  customerId: number;
  type: AccountType;
  balance: number;
  interestRate?: number;
  overdraftLimit?: number;
}

// Transaction types
export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  COMMITTED = 'COMMITTED'
}

export interface Transaction {
  id: number;
  amount: number;
  sender: Account;
  receiver: Account;
  status: TransactionStatus;
}

export interface TransactionDTO {
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}