import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TransactionForm from '../components/Transaction/TransactionForm';


describe('TransactionForm', () => {
  it('renders the correct labels', () => {
    const { getByLabelText } = render(<TransactionForm onTransactionSubmitted={() => { }} />);

    expect(getByLabelText('Account ID:')).toBeInTheDocument();
    expect(getByLabelText('Amount:')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const onTransactionSubmitted = jest.fn();
    const { getByLabelText, getByText } = render(
      <TransactionForm onTransactionSubmitted={onTransactionSubmitted} />
    );

    fireEvent.change(getByLabelText('Account ID:'), { target: { value: 'be347241-9e4f-4247-bba4-82a3fecdf522' } });
    fireEvent.change(getByLabelText('Amount:'), { target: { value: '100' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onTransactionSubmitted).toHaveBeenCalled();
    });
  });

  it('displays error messages for invalid form data', async () => {
    const onTransactionSubmitted = jest.fn();
    const { getByLabelText, getByText } = render(<TransactionForm onTransactionSubmitted={() => { }} />);

    fireEvent.change(getByLabelText('Account ID:'), { target: { value: 'invalid-uuid' } });
    fireEvent.change(getByLabelText('Amount:'), { target: { value: '' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Invalid Account ID. Please enter a valid UUID')).toBeTruthy();
      expect(getByText('Amount is required.')).toBeTruthy();
      expect(onTransactionSubmitted).not.toHaveBeenCalled();

    });
  });

});
