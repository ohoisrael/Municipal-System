import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserPropertiesList() {
    const [properties, setProperties] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProperties = async () => {
            const res = await fetch("/api/property/user-properties", {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
            const data = await res.json();
            setProperties(data);
        };
        fetchProperties();
    }, [currentUser]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Address</th>
                        <th className="px-4 py-2 border-b">House Number</th>
                        <th className="px-4 py-2 border-b">Land Line</th>
                        <th className="px-4 py-2 border-b">Land Size</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id} className="text-center">
                            <td className="px-4 py-2 border-b">{property.address}</td>
                            <td className="px-4 py-2 border-b">{property.houseNumber}</td>
                            <td className="px-4 py-2 border-b">{property.landline}</td>
                            <td className="px-4 py-2 border-b">{property.landSize}</td>
                            <td className="px-4 py-2 border-b">{property.status}</td>
                            <td className="px-4 py-2 border-b">{property.amount ? `₵${property.amount}` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserPropertiesList;
