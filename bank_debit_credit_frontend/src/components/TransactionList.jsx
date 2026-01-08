export default function TransactionList({ transactions }) {
  return (
    <div className="card">
      <h3>Transactions</h3>
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={tx.transaction_type === "credit" ? "tx-credit" : "tx-debit"}
        >
          <span>{tx.product_name}</span>
          <span>Rs {tx.amount}</span>
        </div>
      ))}
    </div>
  );
}
