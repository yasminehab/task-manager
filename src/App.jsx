import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  // ✅ Load expenses from localStorage, ensuring amounts are numbers
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses
      ? JSON.parse(savedExpenses).map(expense => ({
          ...expense,
          amount: Number(expense.amount),
        }))
      : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Save expenses to localStorage when `expenses` change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ✅ Ensure every new expense has a unique ID
  const addExpense = (expense) => {
    setExpenses([
      ...expenses,
      { ...expense, id: Date.now(), amount: Number(expense.amount) },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // ✅ Get unique categories for filtering
  const categories = Array.from(
    new Set(expenses.map((expense) => expense.category))
  );

  // ✅ Compute total expenses safely
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // ✅ Filter expenses based on selected category
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Expense Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expense Form Section */}
        <div>
          <ExpenseForm addExpense={addExpense} />
        </div>

        {/* Expense List & Filter Section */}
        <div>
          {/* Category Filter */}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-2">Filter by Category</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Total Expenses */}
          <div className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
            <p className="text-3xl font-bold text-blue-700">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>

          {/* Expense List */}
          <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default App;
