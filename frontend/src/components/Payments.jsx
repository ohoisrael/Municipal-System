import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Payments() {
  const [payments, setPayments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPayments = async () => {
      const url = currentUser.isAdmin ? "/api/payment/all-payments" : "/api/payment/user-payments";
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        }
      });
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, [currentUser]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Amount</th>
            <th className="px-4 py-2 border-b">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="text-center">
              <td className="px-4 py-2 border-b">{payment.userId && payment.userId.username ? payment.userId.username : currentUser.username || 'Unknown'}</td>


              <td className="px-4 py-2 border-b">{payment.amount}</td>
              <td className="px-4 py-2 border-b">{new Date(payment.paymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
