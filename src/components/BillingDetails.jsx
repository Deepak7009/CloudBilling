import React from 'react';

const BillingDetails = ({ billingDetails, handleBillingChange, orderItems, calculateTotal, generateBillSlip, removeFromOrder }) => (
    <div className="flex flex-col w-full md:w-1/3 bg-white px-4 pt-2 rounded shadow-md mt-4 md:mt-0 md:ml-4">
        <p className="text-lg font-bold mb-4 ">Billing Details</p>
        <div className="flex flex-col space-y-4 mb-4">
            <div className='flex items-center'>
                <label className="w-1/4 text-right pr-4">Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={billingDetails.name}
                    onChange={handleBillingChange}
                    className="border border-gray-400 rounded px-4 py-2 flex-grow"
                />
            </div>
            <div className='flex items-center'>
                <label className="w-1/4 text-right pr-4">Mobile:</label>
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile No."
                    value={billingDetails.mobile}
                    onChange={handleBillingChange}
                    className="border border-gray-400 rounded px-4 py-2 flex-grow"
                />
            </div>
        </div>

        <p className="text-lg font-bold mb-4">Order Summary</p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-50">Item</th>
                        <th className="py-2 px-4 bg-gray-50">Quantity</th>
                        <th className="py-2 px-4 bg-gray-50">Price</th>
                        <th className="py-2 px-4 bg-gray-50">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orderItems?.map((orderItem) => (
                        <tr key={orderItem.name}>
                            <td className="py-2 px-4 text-center">{orderItem.name}</td>
                            <td className="py-2 px-4 text-center">{orderItem.quantity}</td>
                            <td className="py-2 px-4 text-center">₹{orderItem.price * orderItem.quantity}</td>
                            <td className="py-2 px-4 text-center">
                                <button
                                    onClick={() => removeFromOrder(orderItem)}
                                    className="text-red-500 hover:text-red-700 flex justify-center">
                                    ×
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex flex-row justify-between mt-4">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">₹ {calculateTotal()}</p>
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={generateBillSlip}
        >
            Place Order
        </button>
    </div>
);

export default BillingDetails;
