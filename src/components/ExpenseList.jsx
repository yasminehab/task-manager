import React from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  // Handle empty state
  if (!expenses || !Array.isArray(expenses) || expenses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-xl">No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Expense List</h2>
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="font-semibold text-lg">{expense.name}</h3>
                <p className="text-sm text-gray-600">{expense.category}</p>
              </div>
              <div className="flex items-center space-x-8">
                <span className="font-bold text-lg text-gray-900">
                  ${expense.amount?.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;
