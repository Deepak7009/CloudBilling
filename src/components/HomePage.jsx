import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import ItemList from './ItemList';
import BillingDetails from './BillingDetails';
import BillModal from './BillModal';
import Navbar from './Navbar';

function RestaurantManagementApp() {
    const [selectedCategory, setSelectedCategory] = useState('Beverages');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        mobile: '',
        address: '',
        locality: '',
    });
    const [billSlip, setBillSlip] = useState('');
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);

    const items = {
        Beverages: [
           { name: 'Coffee', description: 'Hot / Cold', price: 40 },
           { name: 'Tea', description: 'Hot / Cold', price: 30 },
           { name: 'Juice', description: 'Fresh / Packaged', price: 50 },
           { name: 'Smoothie', description: 'Fruit / Veggie', price: 60 },
           { name: 'Milkshake', description: 'Chocolate / Vanilla', price: 70 },
           { name: 'Soda', description: 'Coke / Pepsi', price: 25 },
        ],
        Desserts: [
           { name: 'Ice Cream', description: 'Vanilla / Chocolate', price: 50 },
           { name: 'Cake', description: 'Slice', price: 60 },
           { name: 'Brownie', description: 'With / Without Nuts', price: 40 },
           { name: 'Pudding', description: 'Chocolate / Vanilla', price: 35 },
           { name: 'Pastry', description: 'Chocolate / Strawberry', price: 45 },
           { name: 'Cookies', description: 'Chocolate Chip / Oatmeal', price: 30 },
        ],
        Snacks: [
           { name: 'French Fries', description: 'Regular / Large', price: 50 },
           { name: 'Nachos', description: 'Cheese / Jalapeno', price: 70 },
           { name: 'Spring Rolls', description: 'Veg / Non-Veg', price: 80 },
           { name: 'Samosa', description: '2 pieces', price: 40 },
        ],
        Sandwiches: [
           { name: 'Veg Sandwich', description: 'Grilled / Plain', price: 60 },
           { name: 'Chicken Sandwich', description: 'Grilled / Plain', price: 80 },
           { name: 'Club Sandwich', description: 'Triple Layer', price: 100 },
           { name: 'Paneer Sandwich', description: 'Grilled / Plain', price: 90 },
        ],
        Pizza: [
           { name: 'Margherita', description: 'Regular / Large', price: 150 },
           { name: 'Pepperoni', description: 'Regular / Large', price: 200 },
           { name: 'Veggie Delight', description: 'Regular / Large', price: 170 },
           { name: 'BBQ Chicken', description: 'Regular / Large', price: 220 },
        ],
        Burgers: [
           { name: 'Veg Burger', description: 'With Cheese / Without Cheese', price: 60 },
           { name: 'Chicken Burger', description: 'With Cheese / Without Cheese', price: 80 },
           { name: 'Cheese Burger', description: 'Double Cheese', price: 100 },
           { name: 'Paneer Burger', description: 'With Cheese / Without Cheese', price: 90 },
        ],
        Rice: [
           { name: 'Fried Rice', description: 'Veg / Non-Veg', price: 90 },
           { name: 'Biryani', description: 'Chicken / Mutton', price: 120 },
           { name: 'Jeera Rice', description: 'With Dal', price: 70 },
           { name: 'Plain Rice', description: 'Steamed', price: 50 },
        ],
        Combos: [
           { name: 'Burger Combo', description: 'Burger + Fries + Drink', price: 150 },
           { name: 'Pizza Combo', description: 'Pizza + Garlic Bread + Drink', price: 200 },
           { name: 'Sandwich Combo', description: 'Sandwich + Chips + Drink', price: 130 },
           { name: 'Rice Combo', description: 'Rice + Curry + Drink', price: 140 },
        ],
     };
  
     const removeFromOrder = (itemToRemove) => {
        setOrderItems(orderItems.filter(item => item !== itemToRemove));
    };


    const filteredItems = items[selectedCategory]?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToOrder = (item) => {
        const existingItem = orderItems.find(orderItem => orderItem.name === item.name);
        if (existingItem) {
            setOrderItems(orderItems.map(orderItem =>
                orderItem.name === item.name
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
            {/* <Navbar /> */}
            <main className="flex flex-grow overflow-y-scroll bg-gray-200 p-4">
                <div className="flex flex-col md:flex-row w-full">
                    <Sidebar
                        items={items}
                        setSelectedCategory={setSelectedCategory}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="flex flex-col w-full md:w-2/3">
                        <SearchBar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            items={items}
                        />
                        <ItemList
                            filteredItems={filteredItems}
                            addToOrder={addToOrder}
                        />
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
