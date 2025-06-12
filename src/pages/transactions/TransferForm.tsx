import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createTransaction } from '../../store/slices/transactionSlice';
import { fetchAccounts } from '../../store/slices/accountSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const TransferForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts } = useSelector((state: RootState) => state.accounts);
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: ''
  });
  const [errors, setErrors] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: ''
  });

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.fromAccountId) {
      newErrors.fromAccountId = 'Please select a source account';
      valid = false;
    }
    
    if (!formData.toAccountId) {
      newErrors.toAccountId = 'Please select a destination account';
      valid = false;
    }
    
    if (formData.fromAccountId === formData.toAccountId) {
      newErrors.toAccountId = 'Source and destination accounts cannot be the same';
      valid = false;
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(createTransaction({
        fromAccountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: parseFloat(formData.amount),
        description: formData.description || 'Transfer'
      }));
      
      // Reset form
      setFormData({
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        description: ''
      });
    }
  };

  return (
    <div className="transfer-form-container">
      <h2>Make a Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From Account</label>
          <select
            name="fromAccountId"
            value={formData.fromAccountId}
            onChange={handleChange}
            className={errors.fromAccountId ? 'error' : ''}
          >
            <option value="">Select account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.accountType} - ${account.balance.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.fromAccountId && <p className="error-text">{errors.fromAccountId}</p>}
        </div>
        
        <div className="form-group">
          <label>To Account</label>
          <select
            name="toAccountId"
            value={formData.toAccountId}
            onChange={handleChange}
            className={errors.toAccountId ? 'error' : ''}
          >
            <option value="">Select account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.accountType} - ${account.balance.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.toAccountId && <p className="error-text">{errors.toAccountId}</p>}
        </div>
        
        <div className="form-group">
          <label>Amount</label>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <p className="error-text">{errors.amount}</p>}
        </div>
        
        <div className="form-group">
          <label>Description (Optional)</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        
        <Button type="submit">Transfer Funds</Button>
      </form>
    </div>
  );
};

export default TransferForm;