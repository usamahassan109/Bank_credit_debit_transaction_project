import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addTransaction } from "../api/transaction.api";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [tx, setTx] = useState({
    product_name: "",
    amount: "",
    transaction_type: "credit",
  });

  const submit = async () => {
    if (!tx.product_name || !tx.amount) {
      alert("All fields required");
      return;
    }

    try {
      await addTransaction({
        ...tx,
        amount: Number(tx.amount),
      });
      alert("Transaction added");
      setTx({ product_name: "", amount: "", transaction_type: "credit" });
    } catch (err) {
      alert("Error adding transaction");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Transaction</h3>

      <input
        placeholder="Product Name"
        value={tx.product_name}
        onChange={(e) => setTx({ ...tx, product_name: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        value={tx.amount}
        onChange={(e) => setTx({ ...tx, amount: e.target.value })}
      />

      <select
        value={tx.transaction_type}
        onChange={(e) =>
          setTx({ ...tx, transaction_type: e.target.value })
        }
      >
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <button onClick={submit}>Add</button>
    </div>
  );
}
