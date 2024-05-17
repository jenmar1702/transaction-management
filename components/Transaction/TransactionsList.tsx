import React from "react";
import TransactionCard from "./TransactionCard";
import { Transaction } from "../../types/transaction";

const TransactionsList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      <h2>Transaction History</h2>
      <div className="m-4 p-7 border border-solid border-black">
        {typeof transactions === "string" && <p>There was an error</p>}
        {transactions?.length > 0 ? (
          <>
            {transactions.map((transaction, index) => (
              <TransactionCard
                key={index}
                transaction={transaction}
                isLastTransaction={index === 0}
              />
            ))}
          </>
        ) : (
          <span>Loading Transaction History...</span>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
