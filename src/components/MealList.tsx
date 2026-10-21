import { useState } from "react"
import type Meal from "../types/meal"
import MealCard from "./MealCard"

const MealList = ({ meal, deleteMeal, editMeal, }: {
    meal: Meal[], deleteMeal: (id: number) => void, editMeal: (
        id: number,
        name: string,
        category: string,
        calories: number
    ) => void

}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sort, setSort] = useState('calories-asc')
    const filteredMeals = meal.filter((item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || item.category === selectedCategory)
    ))
    const sortedMeals = [...filteredMeals].sort((a, b) => {
        if (sort === 'calories-asc') {
            return a.calories - b.calories
        } if (sort === 'calories-desc') {
            return b.calories - a.calories
        }
        return a.name.localeCompare(b.name)

    })
    const uniqueCategory = [...new Set(meal.map(item => item.category))]
    const categoryMeals = meal.filter(item =>
        selectedCategory === 'All' || item.category === selectedCategory)
    const categoryCalory = categoryMeals.reduce((sum, item) => sum + item.calories, 0)
    const averageCalory = categoryMeals.length > 0 ? categoryCalory / categoryMeals.length : 0

    return (
        <>
            <input type="text" name="serach" placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select name="category" id="" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>

                <option value="All">All</option>
                {uniqueCategory.map(item =>

                    <option key={item} value={item}>
                        {item}
                    </option>

                )}

            </select>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="name-asc">Name (A–Z)</option>
                <option value="calories-asc">Calories (low to high)</option>
                <option value="calories-desc">Calories (high to low)</option>
            </select>

            <div>
                {sortedMeals.length === 0 && <div>No meals found.</div>}
                {sortedMeals.map((item) => (
                    <MealCard editMeal={editMeal} key={item.id} meal={item} deleteMeal={deleteMeal} />
                ))}
                <p>
                    category calory of {selectedCategory}={categoryCalory}
                    average calory of {selectedCategory}={averageCalory.toFixed(2)}
                </p>
            </div>
        </>
    )
}

export default MealList