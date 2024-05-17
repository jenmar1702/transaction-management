import React, { useState } from "react";
import { createTransactionAction } from "../../actions/transactions";

export default function TransactionForm({
  onTransactionSubmitted,
}: {
  onTransactionSubmitted: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ account_id: "", amount: "" });

  const isValidUUID = (accountId: string) => {
    const accountIdPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return accountIdPattern.test(accountId);
  };

  const validateFormData = (formData: any) => {
    const newErrors = { account_id: "", amount: "" };

    if (!formData.account_id) {
      newErrors.account_id = "Account ID is required.";
    } else if (!isValidUUID(formData.account_id)) {
      newErrors.account_id = "Invalid Account ID. Please enter a valid UUID";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    if (!validateFormData(formJson)) {
      setIsLoading(false);
      return;
    }

    await createTransactionAction(formJson);
    onTransactionSubmitted();
    e.target.reset();

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Submit new transaction</h2>
      <form
        className="flex flex-col m-4 p-7 border border-solid border-black"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start">
          <label htmlFor="account_id">Account ID:</label>
          <input
            type="text"
            name="account_id"
            id="account_id"
            data-type="account-id"
          />
          <p className="text-red-500 min-h-6 text-xs">
            {errors.account_id && errors.account_id}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="amount">Amount:</label>
          <input type="number" name="amount" id="amount" data-type="amount" />
          <p className="text-red-500 min-h-6 text-xs">
            {errors.amount && errors.amount}
          </p>
        </div>
        <input
          className="w-40 self-center cursor-pointer hover:bg-gray-700"
          data-type="transaction-submit"
          value={isLoading ? "Submitting..." : "Submit"}
          type="submit"
        />
      </form>
    </div>
  );
}
