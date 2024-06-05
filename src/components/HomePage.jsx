import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ItemList from './ItemList';
import BillingDetails from './BillingDetails';
import BillModal from './BillModal';
import { ItemsContext } from '../context/ItemsContext';

function RestaurantManagementApp() {
    const [selectedCategory, setSelectedCategory] = useState('Beverages');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        productName: '',
        mobile: ''
    });
    const [billSlip, setBillSlip] = useState('');
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);
    const { items } = useContext(ItemsContext);

    const removeFromOrder = (itemToRemove) => {
        setOrderItems(orderItems.filter(item => item !== itemToRemove));
    };

    const allItems = Object.values(items).flat();
    //   console.log("All Items:",allItems);

    const filteredItems = searchQuery
        ? allItems.filter((item) =>
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : items[selectedCategory] || [];

    //  console.log("Filtered items :", filteredItems);

    const addToOrder = (item) => {
        const existingItem = orderItems.find(orderItem => orderItem.productName === item.productName);
        if (existingItem) {
            setOrderItems(orderItems.map(orderItem =>
                orderItem.productName === item.productName
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            ));
        } else {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        }
    };

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleBillingChange = (e) => {
        const { productName, value } = e.target;
        setBillingDetails({ ...billingDetails, [productName]: value });
    };

    const generateBillSlip = () => {
        let billText = `Bill Details\n`;
        billText += `productName: ${billingDetails.name}\n`;
        billText += `Mobile: ${billingDetails.mobile}\n`;
        billText += `\nOrder Summary\n`;
        orderItems.forEach(item => {
            billText += `${item.productName} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        });
        billText += `\nTotal: ₹${calculateTotal()}\n`;

        setBillSlip(billText);
        setIsBillModalOpen(true);
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(billSlip)}`;
        window.open(whatsappUrl, '_blank');
    };

    const closeModal = () => {
        setIsBillModalOpen(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <main className="flex flex-grow bg-gray-200 p-4">
                <div className="flex flex-col md:flex-row w-full">
                    <Sidebar
                        items={items}
                        setSelectedCategory={setSelectedCategory}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="flex flex-col w-full lg:w-1/2 xl:w-2/3">
                        <SearchBar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            items={items}
                        />
                        <ItemList filteredItems={filteredItems} addToOrder={addToOrder} />
                    </div>

                    <BillingDetails
                        billingDetails={billingDetails}
                        handleBillingChange={handleBillingChange}
                        orderItems={orderItems}
                        calculateTotal={calculateTotal}
                        generateBillSlip={generateBillSlip}
                        removeFromOrder={removeFromOrder}
                    />

                </div>
            </main>

            {isBillModalOpen && (
                <BillModal
                    billingDetails={billingDetails}
                    orderItems={orderItems}
                    calculateTotal={calculateTotal}
                    closeModal={closeModal}
                    shareOnWhatsApp={shareOnWhatsApp}
                />
            )}
        </div>
    );
}

export default RestaurantManagementApp;
