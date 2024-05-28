import React, { useState } from 'react';

const BillModal = ({ billingDetails, orderItems, calculateTotal, closeModal, shareOnWhatsApp }) => {
   const [discount, setDiscount] = useState(0);
   const [gst, setGST] = useState(0);

   const handleDiscountChange = (e) => {
      const value = parseFloat(e.target.value);
      setDiscount(isNaN(value) ? 0 : value);
   };

   const handleGSTChange = (e) => {
      const value = parseFloat(e.target.value);
      setGST(isNaN(value) ? 0 : value);
   };

   const totalWithDiscount = calculateTotal() - discount;
   const totalWithGST = totalWithDiscount * (1 + gst / 100);

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-lg">
            <div className="bill-slip bg-gray-100 p-4 rounded">
               <h2 className="text-xl font-bold mb-2">Bill Details</h2>
               <p><span className='font-semibold'>Name: </span>{billingDetails.name}</p>
               <p><span className='font-semibold'>Mobile: </span>{billingDetails.mobile}</p>

               <h3 className="text-lg font-bold mt-4 mb-2">Order Summary</h3>
               <ul className="list-disc list-inside mb-2">
                  {orderItems.map(item => (
                     <li key={item.name}>{item.name} x {item.quantity} = ₹{item.price * item.quantity}</li>
                  ))}
               </ul>
               <p className="bill-total text-lg font-bold mt-4"><strong>Total :</strong> ₹{calculateTotal()}</p>
               <div className='flex'>
                  <div className="mt-2">
                     <label htmlFor="discount" className="font-semibold pl-3">Discount:</label>
                     <input
                        type="number"
                        id="discount"
                        className="border border-gray-300 rounded p-1 ml-2"
                        value={discount}
                        onChange={handleDiscountChange}
                     />
                  </div>
                  <div className="mt-2">
                     <label htmlFor="gst" className="font-semibold pl-3">GST (%):</label>
                     <input
                        type="number"
                        id="gst"
                        className="border border-gray-300 rounded p-1 ml-2"
                        value={gst}
                        onChange={handleGSTChange}
                     />
                  </div>
               </div>
               <p className="bill-total text-lg font-bold mt-2"><strong>Grand Total :</strong> ₹{totalWithGST}</p>
            </div>
            <div className="flex flex-row justify-between mt-4">
               <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={shareOnWhatsApp}
               >
                  Share on WhatsApp
               </button>
               <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"

               >
                  Print
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
};

export default BillModal;
