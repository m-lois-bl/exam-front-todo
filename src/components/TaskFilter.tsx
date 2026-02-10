import type Category from "../types/category.interface";

type TasksFilterProps = {
    categories: Category[],
    defaultCategory: Category,
    selectedCategory: Category,
    changeSelectedCategory: (newCategory: Category) => void
}
export default function TasksFilter({ categories, defaultCategory, selectedCategory, changeSelectedCategory }: TasksFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = Number(e.target.value)
        if (categoryId === 0) {
            changeSelectedCategory(defaultCategory)
        }
        else {
            const newSelectedCategory: Category[] = categories.filter((category) => category.id === categoryId)
            changeSelectedCategory(newSelectedCategory[0])
        }
    }

    return (
        <select
            className="border rounded-md mb-6 border-stone-300 bg-stone-300 py-2 px-4"
            name="category-filter"
            id="category-filter"
            onChange={handleChange}
            value={selectedCategory.id}
        >
            <option value={defaultCategory.id}>Toutes les catégories</option>
            {categories.length > 0 && categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
    )
}