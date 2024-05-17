import React, { useEffect, useState } from "react";
import { Transaction } from "../../types/transaction";
import { getAccountByIdAction } from "../../actions/transactions";

const TransactionCard = ({
  transaction,
  isLastTransaction,
}: {
  transaction: Transaction;
  isLastTransaction: boolean;
}) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const data = await getAccountByIdAction(transaction.account_id);

      if (typeof data !== "string") {
        setBalance(data.balance);
      }
    };

    if (isLastTransaction) {
      fetchBalance();
    }
  }, [transaction, isLastTransaction]);

  const transactionAmount = Math.abs(transaction.amount);
  const transactionType =
    transaction.amount > 0 ? "to account" : "from account";

  return (
    <div
      key={transaction.transaction_id}
      data-type="transaction"
      data-account-id={transaction.account_id}
      data-amount={transaction.amount}
      data-balance={balance}
      className="border border-gray-300 p-4 mb-4 min-h-20 text-left"
    >
      <p>
        Transferred <strong>{transactionAmount}$</strong> {transactionType}{" "}
        <strong>{transaction.account_id}</strong>
      </p>
      {balance && (
        <p>
          The current account balance is <strong>{balance}$</strong>
        </p>
      )}
    </div>
  );
};

export default TransactionCard;
