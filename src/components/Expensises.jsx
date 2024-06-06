import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../utils/Const";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import update from "../assets/images/svg/updateicon.svg";
import upd from "../assets/images/edit.png";
import cross from "../assets/images/svg/crossicon.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Expensises = () => {
    const [form, setForm] = useState({
        srno: "",
        date: new Date().toISOString().split('T')[0],
        title: "",
        price: "",
        description: ""
    });

    const [data, setData] = useState([]);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [filter, setFilter] = useState("All Transactions");
    const [currentPage, setCurrentPage] = useState(1);
    const expensesPerPage = 15;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}expenses`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdateMode) {
            try {
                await axios.put(`${baseUrl}expenses/${updateId}`, form);
                toast.success("Data updated successfully!");
                setForm({
                    srno: "",
                    date: new Date().toISOString().split('T')[0],
                    title: "",
                    price: "",
                    description: ""
                });
                setIsUpdateMode(false);
                setUpdateId(null);
                fetchData();
            } catch (error) {
                toast.error("Error updating data!");
                console.error("Error updating category:", error);
            }
        } else {
            try {
                const newForm = { ...form, srno: data.length + 1 };
                await axios.post(`${baseUrl}expenses`, newForm);
                toast.success("Expense added successfully!");
                setForm({
                    srno: "",
                    date: new Date().toISOString().split('T')[0],
                    title: "",
                    price: "",
                    description: ""
                });
                fetchData();
            } catch (error) {
                if (error.response && error.response.data.message === "Expense already exists") {
                    toast.error("Expense already exists!");
                } else {
                    toast.error("Error adding expense!");
                }
                console.error("Error adding expense:", error);
            }
        }
    };

    const handleUpdateClick = (item) => {
        setForm(item);
        setIsUpdateMode(true);
        setUpdateId(item._id);
    };

    const handleDelete = async (id) => {
        toast.info(
            <div>
                <div>
                    <p>Are you sure you want to delete this expense?</p>
                </div>
                <div className="flex justify-center mt-2">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                        onClick={async () => {
                            try {
                                await axios.delete(`${baseUrl}expenses/${id}`);
                                toast.dismiss(); // Dismiss the toast after deletion
                                toast.success("Expense deleted successfully!");
                                fetchData();
                            } catch (error) {
                                toast.dismiss(); // Dismiss the toast if error occurs
                                toast.error("Error deleting expense!");
                                console.error("Error deleting expense:", error);
                            }
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 text-black px-3 py-1 rounded"
                        onClick={() => toast.dismiss()}
                    >
                        No
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false
            }
        );
    };

    const filterData = (data) => {
        const now = new Date();
        let filteredData = data;

        switch (filter) {
            case "7 Days":
                filteredData = data.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (now - itemDate) / (1000 * 60 * 60 * 24) <= 7;
                });
                break;
            case "1 Month":
                filteredData = data.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (now - itemDate) / (1000 * 60 * 60 * 24) <= 30;
                });
                break;
            case "3 Months":
                filteredData = data.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (now - itemDate) / (1000 * 60 * 60 * 24) <= 90;
                });
                break;
            case "All Transactions":
            default:
                break;
        }

        return filteredData;
    };

    const calculateTotalPrice = (filteredData) => {
        return filteredData.reduce((total, item) => {
            return total + parseFloat(item.price || 0);
        }, 0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredData = filterData(data);
    const totalPrice = calculateTotalPrice(filteredData);
    const totalPages = Math.ceil(filteredData.length / expensesPerPage);
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = filteredData.slice(indexOfFirstExpense, indexOfLastExpense);

    const Pagination = ({ totalPages, currentPage, onPageChange }) => (
        <div className="flex justify-center my-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );

    const getChartData = (data) => {
        const labels = data.map(item => item.date);
        const prices = data.map(item => parseFloat(item.price));

        return {
            labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                }
            ],
        };
    };

    return (
        <div className="m-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-1">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block mb-1">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-1">Description</label>
                        <textarea
                            id="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="1"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {isUpdateMode ? "Update Expense" : "Add Expense"}
                </button>
            </form>
            <div className="my-4">
                <select value={filter} onChange={handleFilterChange} className="p-2 border rounded">
                    <option value="All Transactions">All Transactions</option>
                    <option value="7 Days">Last 7 Days</option>
                    <option value="1 Month">Last 1 Month</option>
                    <option value="3 Months">Last 3 Months</option>
                </select>
            </div>
            <div className="my-4">
                <h2 className="text-xl font-bold">Total Price: {totalPrice.toFixed(2)}</h2>
            </div>
            <div className="my-4">
                <Line data={getChartData(filteredData)} />
            </div>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Sr No</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExpenses.map((item, index) => (
                        <tr key={item._id}>
                            <td className="border px-4 py-2">{item.srno}</td>
                            <td className="border px-4 py-2">{item.date}</td>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2">{item.price}</td>
                            <td className="border px-4 py-2">{item.description}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="text-blue-500 mr-2"
                                    onClick={() => handleUpdateClick(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            <ToastContainer />
        </div>
    );
};

export default Expensises;
