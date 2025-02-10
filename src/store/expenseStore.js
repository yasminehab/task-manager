import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      expenses: [],
      filter: "",
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: Date.now() }],
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
      setFilter: (category) => set({ filter: category }),

      filteredExpenses: [],
    }),
    {
      name: "expense-store",
      getStorage: () => localStorage,
    }
  )
);

useExpenseStore.subscribe((state) => {
  const { expenses, filter } = state;
  state.filteredExpenses = filter
    ? expenses.filter((expense) => expense.category === filter)
    : expenses;
});
