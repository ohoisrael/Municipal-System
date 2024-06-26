import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

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
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>
      <Table>
        <TableHead>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Payment Date</TableHeadCell>
          </TableHead>     
        <TableBody className="divide-y">
          {payments.map((payment) => (
            <TableRow key={payment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{payment.userId && payment.userId.username ? payment.userId.username : currentUser.username || 'Unknown'}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
              </TableRow>
            
          ))}
      </TableBody>
      </Table>
    </div>
  );
}

export default Payments;
