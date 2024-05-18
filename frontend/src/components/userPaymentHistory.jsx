import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserPaymentHistory() {
    const [payments, setPayments] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPayments = async () => {
            const res = await fetch("/api/payments/user", {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
            const data = await res.json();
            setPayments(data);
        };
        fetchPayments();
    }, [currentUser]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Property Address</th>
                        <th className="px-4 py-2 border-b">Amount</th>
                        <th className="px-4 py-2 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id} className="text-center">
                            <td className="px-4 py-2 border-b">{payment.propertyAddress}</td>
                            <td className="px-4 py-2 border-b">${payment.amount}</td>
                            <td className="px-4 py-2 border-b">{new Date(payment.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserPaymentHistory;
