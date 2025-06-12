import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTransactions } from '../../store/slices/transactionSlice';
import Card from '../../components/ui/Card';

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="transaction-list-container">
      <h2>Recent Transactions</h2>
      
      {transactions.length > 0 ? (
        <div className="transactions-grid">
          {transactions.map(transaction => (
            <Card key={transaction.id}>
              <div className={`transaction-type ${transaction.type.toLowerCase()}`}>
                {transaction.type}
              </div>
              <p className="transaction-amount">
                ${transaction.amount.toFixed(2)}
              </p>
              <p className="transaction-description">{transaction.description}</p>
              <p className="transaction-date">{formatDate(transaction.createdAt)}</p>
              <div className="transaction-accounts">
                <p>From: {transaction.fromAccount?.accountNumber || 'External'}</p>
                <p>To: {transaction.toAccount?.accountNumber || 'External'}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;