import { useState } from "react";
import { addTransaction } from "../api/transaction.api.js";

export default function TransactionForm({ onTransactionAdded }) {
  const [tx, setTx] = useState({
    product_name: "",
    amount: "",
    transaction_type: "credit"
  });

  const submit = async () => {
    if (!tx.product_name || !tx.amount) {
      alert("All fields required");
      return;
    }

    try {
      // Add transaction
      await addTransaction({ ...tx, amount: Number(tx.amount) });
      alert("Transaction Added");

      // Reset form
      setTx({ product_name: "", amount: "", transaction_type: "credit" });

      // Refresh dashboard / parent state
      if (onTransactionAdded) onTransactionAdded();

    } catch (err) {
      console.error(err);
      alert("Error adding transaction");
    }
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>

      <input
        type="text"
        placeholder="Product Name"
        value={tx.product_name}
        onChange={e => setTx({ ...tx, product_name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={tx.amount}
        onChange={e => setTx({ ...tx, amount: e.target.value })}
      />

      <select
        value={tx.transaction_type}
        onChange={e => setTx({ ...tx, transaction_type: e.target.value })}
      >
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <button onClick={submit}>Add</button>
    </div>
  );
}
