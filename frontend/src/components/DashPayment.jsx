import { Button, TextInput } from "flowbite-react";


export default function DashPayment() {
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
    <img src="ledz.jpg" className="h-40 mx-auto" alt="img" />
    <h1 className="my-7 text-center font-semibold text-3xl">
      Make Payments
    </h1>
    <form className="flex flex-col gap-4">
      <TextInput type="text" id="phonenumber" placeholder="Phone Number" required />
      <TextInput type="text" id="amount" placeholder="Amount ₵" required/>
      <Button type="submit">Pay</Button>
    </form>
  </div>
  )
}
