import { useExpenseStore } from "../store/expenseStore"

function CategoryFilter() {
  const { setFilter } = useExpenseStore()

  return (
    <div className="mb-4">
      <label htmlFor="category-filter" className="block mb-1">
        Filter by Category
      </label>
      <select
        id="category-filter"
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
    </div>
  )
}

export default CategoryFilter

