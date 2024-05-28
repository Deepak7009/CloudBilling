import React from 'react';

const Header = () => (
    <header className="flex flex-row justify-between bg-gray-800 text-white p-4">
        <div className="flex flex-row items-center">
            <h1 className="text-xl font-bold mr-4">Petpooja</h1>
            <p className="text-sm">India's No.1 Restaurant Management Software</p>
        </div>
        <div className="flex flex-row items-center space-x-4">
            <p className="text-sm">Call For Support: 9099912483</p>
        </div>
    </header>
);

export default Header;
