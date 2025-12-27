import React, { useState, useEffect, useContext } from 'react';
import { useSimpleExpense } from '../src/context/SimpleExpenseContext';
import {toast} from 'react-toastify'

const AllExpensesPage = () => {
  const { expenses, getAllSimpleExpenses, deleteExpense, updateExpense, loading } = useSimpleExpense();
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('-date');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    subcategory: '',
    description: '',
    date: '',
    paymentMethod: '',
  });

  const categories = [
    'All',
    'Food & Drinking',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Personal Care',
    'Other'
  ];

  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other'];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const result = await getAllSimpleExpenses();
    if (!result.success) {
      toast.error(result.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setFormData({
      amount: expense.amount,
      category: expense.category,
      subcategory: expense.subcategory || '',
      description: expense.description || '',
      date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
      paymentMethod: expense.paymentMethod || 'Cash',
    });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setFormData({
      amount: '',
      category: '',
      subcategory: '',
      description: '',
      date: '',
      paymentMethod: '',
    });
  };

  const handleUpdate = async (expenseId) => {
    if (!formData.amount || !formData.category || !formData.date) {
      toast.error('Please fill all required fields');
      return;
    }

    const result = await updateExpense(expenseId, formData);
    if (result.success) {
      toast.success('Expense updated successfully');
      setEditingExpense(null);
      fetchExpenses();
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const result = await deleteExpense(expenseId);
      if (result.success) {
        toast.success('Expense deleted successfully');
        fetchExpenses();
      } else {
        toast.error(result.message);
      }
    }
  };

  const filteredExpenses = expenses?.filter(expense => 
    filterCategory === 'All' || expense.category === filterCategory
  ) || [];

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === '-date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === '-amount') return b.amount - a.amount;
    if (sortBy === 'amount') return a.amount - b.amount;
    return 0;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="max-w-7xl mx-auto p-5 font-mono bg-gray-100 min-h-screen">
      
      <div className="border-4 border-black p-5 mb-5 bg-white flex justify-between items-center flex-wrap gap-5">
        <h1 className="text-4xl font-bold tracking-widest m-0">ALL EXPENSES</h1>
        <div className="border-3 border-black bg-black text-white px-5 py-2.5">
          <span className="text-sm mr-2.5">TOTAL:</span>
          <span className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      
      <div className="border-4 border-black p-5 mb-5 bg-white flex gap-8 flex-wrap">
        <div className="flex items-center gap-2.5">
          <label className="text-sm font-bold tracking-wide">CATEGORY:</label>
          <select 
            className="border-3 border-black px-4 py-2.5 text-sm font-mono font-bold bg-white cursor-pointer min-w-[200px]"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2.5">
          <label className="text-sm font-bold tracking-wide">SORT BY:</label>
          <select 
            className="border-3 border-black px-4 py-2.5 text-sm font-mono font-bold bg-white cursor-pointer min-w-[200px]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="-date">NEWEST FIRST</option>
            <option value="date">OLDEST FIRST</option>
            <option value="-amount">HIGHEST AMOUNT</option>
            <option value="amount">LOWEST AMOUNT</option>
          </select>
        </div>
      </div>

      
      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="border-4 border-black p-10 text-center bg-white">
            <p className="text-xl font-bold tracking-widest m-0">LOADING...</p>
          </div>
        ) : sortedExpenses.length === 0 ? (
          <div className="border-4 border-black p-10 text-center bg-white">
            <p className="text-xl font-bold tracking-widest m-0">NO EXPENSES FOUND</p>
          </div>
        ) : (
          sortedExpenses.map((expense) => (
            <div key={expense._id} className="border-4 border-black bg-white p-5 hover:translate-x-1 hover:translate-y-1 transition-transform">
              {editingExpense === expense._id ? (
                
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide">AMOUNT*</label>
                      <input
                        type="number"
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide">CATEGORY*</label>
                      <select
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">SELECT</option>
                        {categories.filter(cat => cat !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide">SUBCATEGORY</label>
                      <input
                        type="text"
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        placeholder="OPTIONAL"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide">DATE*</label>
                      <input
                        type="date"
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide">PAYMENT METHOD</label>
                      <select
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      >
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold tracking-wide">DESCRIPTION</label>
                      <textarea
                        className="border-3 border-black p-2.5 text-sm font-mono bg-white resize-y focus:outline-none focus:ring-2 focus:ring-black"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="OPTIONAL NOTES"
                        rows="2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-2.5">
                    <button 
                      className="border-3 border-black px-8 py-3 bg-black text-white text-sm font-bold font-mono cursor-pointer tracking-wide hover:bg-white hover:text-black transition-colors"
                      onClick={() => handleUpdate(expense._id)}
                    >
                      SAVE
                    </button>
                    <button 
                      className="border-3 border-black px-8 py-3 bg-white text-black text-sm font-bold font-mono cursor-pointer tracking-wide hover:bg-black hover:text-white transition-colors"
                      onClick={handleCancelEdit}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start pb-4 border-b-2 border-black">
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-bold">₹{expense.amount.toFixed(2)}</span>
                      <span className="text-sm font-bold bg-black text-white px-2.5 py-1 inline-block w-fit">
                        {expense.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold uppercase">
                        {new Date(expense.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {expense.subcategory && (
                      <div className="flex gap-2.5">
                        <span className="text-xs font-bold min-w-[120px]">SUBCATEGORY:</span>
                        <span className="text-xs">{expense.subcategory}</span>
                      </div>
                    )}
                    {expense.description && (
                      <div className="flex gap-2.5">
                        <span className="text-xs font-bold min-w-[120px]">DESCRIPTION:</span>
                        <span className="text-xs">{expense.description}</span>
                      </div>
                    )}
                    <div className="flex gap-2.5">
                      <span className="text-xs font-bold min-w-[120px]">PAYMENT:</span>
                      <span className="text-xs">{expense.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-2.5">
                    <button 
                      className="border-3 border-black px-6 py-3 bg-white text-black text-sm font-bold font-mono cursor-pointer tracking-wide hover:bg-black hover:text-white transition-colors"
                      onClick={() => handleEdit(expense)}
                    >
                      EDIT
                    </button>
                    <button 
                      className="border-3 border-black px-6 py-3 bg-black text-white text-sm font-bold font-mono cursor-pointer tracking-wide hover:bg-white hover:text-black transition-colors"
                      onClick={() => handleDelete(expense._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllExpensesPage;
