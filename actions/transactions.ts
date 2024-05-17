import {
  createTransaction,
  getAccountById,
  getTransactionHistory,
} from "../requests/transaction";

export async function getTransactionHistoryAction() {
  try {
    return await getTransactionHistory();
  } catch (error) {
    return `There was an error getting the transaction history ${error}`;
  }
}

export async function createTransactionAction(formData: {
  [k: string]: FormDataEntryValue;
}) {
  try {
    return await createTransaction(formData);
  } catch (error) {
    return `There was an error creating a new transaction ${error}`;
  }
}

export async function getAccountByIdAction(account_id: string) {
  try {
    return await getAccountById(account_id);
  } catch (error) {
    return `There was an error getting the account with id ${account_id} ${error}`;
  }
}
