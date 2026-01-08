export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>Balance: Rs {user.total_amount}</h3>
    </div>
  );
}
