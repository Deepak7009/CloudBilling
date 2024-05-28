import React from 'react';

const BillModal = ({ billingDetails, orderItems, calculateTotal, closeModal, shareOnWhatsApp }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-lg">
            <p className="text-lg font-bold mb-4">Generated Bill Slip:</p>
            <div className="bill-slip bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Bill Details</h2>
                <p><strong>Name:</strong> {billingDetails.name}</p>
                <p><strong>Mobile:</strong> {billingDetails.mobile}</p>
                <p><strong>Address:</strong> {billingDetails.address}</p>
                <p><strong>Locality:</strong> {billingDetails.locality}</p>
                <h3 className="text-lg font-bold mt-4 mb-2">Order Summary</h3>
                <ul className="list-disc list-inside mb-2">
                    {orderItems.map(item => (
                        <li key={item.name}>{item.name} x {item.quantity} = ₹{item.price * item.quantity}</li>
                    ))}
                </ul>
                <p className="bill-total text-lg font-bold mt-4"><strong>Total:</strong> ₹{calculateTotal()}</p>
            </div>
            <div className="flex flex-row justify-between mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={shareOnWhatsApp}
                >
                    Share on WhatsApp
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default BillModal;
