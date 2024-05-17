import { Account, Transaction } from "../types/transaction";

const BASE_URL = "https://infra.devskills.app/api/accounting";

export const getTransactionHistory = async (): Promise<Transaction[]> => {
  const response = await fetch(`${BASE_URL}/transactions`);

  return await response.json();
};

export const createTransaction = async (formData: {
  [k: string]: FormDataEntryValue;
}) => {
  const response = await fetch(`${BASE_URL}/transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return await response.json();
};

export const getTransactionById = async (
  transaction_id: string
): Promise<Transaction> => {
  const response = await fetch(`${BASE_URL}/transactions/${transaction_id}`);

  return await response.json();
};

export const getAccountById = async (account_id: string): Promise<Account> => {
  const response = await fetch(`${BASE_URL}/accounts/${account_id}`);

  return await response.json();
};
