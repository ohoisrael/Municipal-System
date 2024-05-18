import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function PaymentForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    location: "",
    housenumber: "",
    amount: "",
  });

  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = formData;
    if (amount < 600) {
      alert("Amount must be 600 or above");
      return;
    }

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        alert("Payment created successfully!");
      }
    } catch (error) {
      alert("Payment failed", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Pay Property Rates Here
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="fullname"
          placeholder="Full Name"
          value={currentUser.username}
          readOnly
          required
        />
        <TextInput
          type="text"
          id="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={currentUser.email} 
          readOnly
        />
        <TextInput
          type="text"
          id="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextInput
          type="text"
          id="housenumber"
          placeholder="House Number"
          value={formData.housenumber}
          onChange={handleChange}
          required
        />
        <TextInput
          type="number"
          id="amount"
          placeholder="Amount ₵"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <Button type="submit">Pay</Button>
      </form>
    </div>
  );
}

export default PaymentForm;
