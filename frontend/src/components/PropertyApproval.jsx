import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";

function PropertyApproval() {
    const [properties, setProperties] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProperties = async () => {
            const res = await fetch("/api/property/all-properties", {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
            const data = await res.json();
            setProperties(data);
        };
        fetchProperties();
    }, [currentUser]);

    const approveProperty = async (propertyId, amount) => {
        try {
            const res = await fetch(`/api/property/approve/${propertyId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();
            if (!res.ok) {
                console.error(data.message);
            } else {
                alert("Property approved successfully!");
                setProperties(properties.map(p => p._id === propertyId ? data : p));
            }
        } catch (error) {
            console.error("Property approval failed", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Properties for Approval</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Username</th>
                        <th className="px-4 py-2 border-b">Address</th>
                        <th className="px-4 py-2 border-b">House Number</th>
                        <th className="px-4 py-2 border-b">Land Line</th>
                        <th className="px-4 py-2 border-b">Land Size</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Amount</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id} className="text-center">
                            <td className="px-4 py-2 border-b">{property.userId ? property.userId.username : 'Unknown'}</td>
                            <td className="px-4 py-2 border-b">{property.address}</td>
                            <td className="px-4 py-2 border-b">{property.houseNumber}</td>
                            <td className="px-4 py-2 border-b">{property.landline}</td>
                            <td className="px-4 py-2 border-b">{property.landSize}</td>
                            <td className="px-4 py-2 border-b">{property.status}</td>
                            <td className="px-4 py-2 border-b">{property.amount}</td>

                            
                            <td className="px-4 py-2 border-b">
                                {property.status === 'Under Review' && (
                                    <TextInput
                                        id={`amount-${property._id}`}
                                        type="number"
                                        placeholder="Set amount"
                                        min="0"
                                        required
                                    />
                                )}
                            </td>
                            <td className="px-4 py-2 border-b">
                                {property.status === 'Under Review' && (
                                    <Button onClick={() => {
                                        const amount = document.getElementById(`amount-${property._id}`).value;
                                        if (amount) {
                                            approveProperty(property._id, amount);
                                        } else {
                                            alert("Please set an amount before approving.");
                                        }
                                    }}>Approve</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PropertyApproval;
