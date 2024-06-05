import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ItemList from './ItemList';
import BillingDetails from './BillingDetails';
import BillModal from './BillModal';
import { ItemsProvider } from '../context/ItemsContext';

function RestaurantManagementApp() {
    const [selectedCategory, setSelectedCategory] = useState('Beverages');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        mobile: ''
    });
    const [billSlip, setBillSlip] = useState('');
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);

    const removeFromOrder = (itemToRemove) => {
        setOrderItems(orderItems.filter(item => item !== itemToRemove));
    };

    //const allItems = Object.values(items).flat();

    //const filteredItems = searchQuery
    //    ? allItems.filter((item) =>
    //        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    //    )
    //    : items[selectedCategory] || [];


    //const addToOrder = (item) => {
    //    const existingItem = orderItems.find(orderItem => orderItem.name === item.name);
    //    if (existingItem) {
    //        setOrderItems(orderItems.map(orderItem =>
    //            orderItem.name === item.name
    //                ? { ...orderItem, quantity: orderItem.quantity + 1 }
    //                : orderItem
    //        ));
    //    } else {
    //        setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    //    }
    //};

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    const generateBillSlip = () => {
        let billText = `Bill Details\n`;
        billText += `Name: ${billingDetails.name}\n`;
        billText += `Mobile: ${billingDetails.mobile}\n`;
        billText += `Address: ${billingDetails.address}\n`;
        billText += `Locality: ${billingDetails.locality}\n`;
        billText += `\nOrder Summary\n`;
        orderItems.forEach(item => {
            billText += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
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
                    <ItemsProvider>
                        <div className="flex flex-col md:flex-row w-full">
                            <Sidebar setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />
                            <div className="flex flex-col w-full lg:w-2/3 xl:w-2/3">
                                <SearchBar
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    //items={items}
                                />
                                <ItemList />
                            </div>
                        </div>
                    </ItemsProvider>
    
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