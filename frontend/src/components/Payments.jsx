import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";

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
      <Table>
        <TableHead>
            <TableHeadCell>Username</Table.HeadCell>
            <TableHeadCell>Amount</Table.HeadCell>
            <TableHeadCell>Payment Date</Table.HeadCell>
          </TableHead>     
        <TableBody className="divide-y">
          {payments.map((payment) => (
            <TableRow key={payment._id} className="text-center">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{payment.userId && payment.userId.username ? payment.userId.username : currentUser.username || 'Unknown'}</TableCell>


              <TableCell className="px-4 py-2 border-b">{payment.amount}</TableCell>
              <TableCell className="px-4 py-2 border-b">{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
              </TableRow>
            
          ))}
      </TableBody>
      </Table>
    </div>
  );
}

export default Payments;
