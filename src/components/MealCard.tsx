import { useState, type FormEvent } from "react"
import type Meal from "../types/meal"

const MealCard = ({ meal, deleteMeal, editMeal }: {
    meal: Meal, deleteMeal: (id: number) => void, editMeal: (
        id: number,
        name: string,
        category: string,
        calories: number
    ) => void
}) => {
    const [editedName, setEditedName] = useState<string>(meal.name)
    const [editedCategory, setEditedCategory] = useState<string>(meal.category)
    const [editedCalories, setEditedCalories] = useState<number>(meal.calories)
    const [isEditing, setIsEditing] = useState<boolean>(false)


    const handleSave = (e: FormEvent) => {
        e.preventDefault()
        editMeal(meal.id, editedName, editedCategory, editedCalories)
        setIsEditing(false)
    }
    const handleCancel = () => {
        setEditedName(meal.name)
        setEditedCategory(meal.category)
        setEditedCalories(meal.calories)
        setIsEditing(false)
    }
    return (
        <>
            {isEditing ?
                <form onSubmit={handleSave}>
                    <input type="text" name="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <input type="text" name="category" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />
                    <input type="number" name="calories" value={editedCalories} onChange={(e) => setEditedCalories(Number(e.target.value))} />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </form >
                :
                <ul>
                    <li>{meal.name}</li>
                    <li>{meal.category}</li>
                    <li>{meal.calories}</li>
                    <li>{meal.id}</li>
                    <button onClick={() => deleteMeal(meal.id)}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </ul>
            }



        </>
    )
}

export default MealCard