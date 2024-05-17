import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getTransactionHistoryAction } from "../actions/transactions";
import Footer from "../components/Footer";
import TransactionForm from "../components/Transaction/TransactionForm";
import TransactionsList from "../components/Transaction/TransactionsList";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const data = await getTransactionHistoryAction();
    setTransactions(data);
  };

  const handleTransactionSubmitted = () => {
    fetchTransactions();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Frontend Boilerplate React/NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-3 gap-4 justify-center w-full flex-1 text-center">
        <div className="col-span-1">
          <TransactionForm
            onTransactionSubmitted={handleTransactionSubmitted}
          />
        </div>
        <div className="col-span-2">
          <TransactionsList transactions={transactions} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
