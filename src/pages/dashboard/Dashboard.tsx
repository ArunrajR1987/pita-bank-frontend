import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAccounts } from '../../store/slices/accountSlice';
import Card from '../../components/ui/Card';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading } = useSelector((state: RootState) => state.accounts);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName || 'User'}!</h1>
      <h2>Your Accounts</h2>
      
      <div className="accounts-grid">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <Card key={account.id}>
              <h3>{account.accountType}</h3>
              <p className="account-number">Account #: {account.accountNumber}</p>
              <p className="balance">Balance: ${account.balance.toFixed(2)}</p>
            </Card>
          ))
        ) : (
          <p>No accounts found. Please contact customer service.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;