import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getProfile } from "../api/user.api.js";
import ProfileCard from "../components/ProfileCard.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import "../styles/dashboard.css"; // 🔹 import CSS

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getProfile();
      setUser(data.user);
      setTransactions(data.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <ProfileCard user={user} />

      <TransactionForm onTransactionAdded={fetchData} />

      <TransactionList transactions={transactions} />
    </div>
  );
}
