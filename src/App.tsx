import { useState, type FormEvent } from "react"
import MealList from "./components/MealList"
import type Meal from "./types/meal"
import mealList from "./data/meal"


const App = () => {


  const [meals, setMeals] = useState<Meal[]>(mealList)
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [calory, setCalory] = useState<number>(0)
  const addMeal = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim() === '' || category.trim() === '' || calory <= 0) {
      alert('Please enter a valid name, category, and calorie amount.')
      return
    }
    const myMeal = {
      name: name,
      category: category,
      calories: calory
    }
    setMeals(
      previousMeals => {
        const nextId = previousMeals.length > 0 ? Math.max(...previousMeals.map(item => item.id)) + 1 : 1
        return [...previousMeals, { ...myMeal, id: nextId }]
      }
    )
    setName('')
    setCategory('')
    setCalory(0)
  }

  const deleteMeal = (id: number) => {
    setMeals(previousMeals => previousMeals.filter(item => item.id !== id))
  }

  const editMeal = (id: number, name: string, category: string, calories: number) => {
    setMeals(previousMeals => previousMeals.map((item) => item.id === id ? { ...item, name, category, calories } : item))
  }

  const totalCalories = meals.reduce((sum, item) => sum + item.calories, 0)

  const averageCalories = meals.length > 0 ? totalCalories / meals.length : 0

  return (
    <>
      <div>
        <MealList
          editMeal={editMeal} meal={meals} deleteMeal={deleteMeal}
        />
        <p>
          Total Calories:{totalCalories}
          average Calories:{averageCalories.toFixed(2)}
        </p>
      </div >
      <form onSubmit={addMeal}>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" name="calories" value={calory} onChange={(e) => setCalory(Number(e.target.value))} />
        <button type="submit">Add Meal</button>
      </form >
    </>
  )
}

export default App