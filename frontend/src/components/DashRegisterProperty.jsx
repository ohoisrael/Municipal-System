import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function DashRegisterProperty() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Register Property
      </h1>
      <form className="flex flex-col gap-4">
        <TextInput type="text" id="fullname" placeholder="Full Name" value={currentUser.username} readOnly />
        <TextInput type="text" id="phonenumber" placeholder="Phone Number" required />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={currentUser.email} readOnly
        />
        <TextInput type="text" id="address" placeholder="Address" required />
        <TextInput type="text" id="housenumber" placeholder="House Number" required />
        <TextInput type="text" id="landline" placeholder="Land Line" required />
        <TextInput type="text" id="landsize" placeholder="Land Size" required />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default DashRegisterProperty;
