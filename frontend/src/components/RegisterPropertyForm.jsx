import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState } from "react";

function RegisterPropertyForm() {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        address: "",
        houseNumber: "",
        landline: "",
        landSize: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/property/register", {
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
                alert("Property registered successfully!");
            }
        } catch (error) {
            console.error("Property registration failed", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">
                Register Property
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    id="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    type="text"
                    id="houseNumber"
                    placeholder="House Number"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    type="text"
                    id="landline"
                    placeholder="Land Line"
                    value={formData.landline}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    type="text"
                    id="landSize"
                    placeholder="Land Size"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default RegisterPropertyForm;
