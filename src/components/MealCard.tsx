import type Meal from "../types/meal"

const MealCard = ({ meal }: { meal: Meal[] }) => {
    return (
        <ul>
            {meal.map((meal) =>
                <div key={meal.id}>
                    <li>{meal.name}</li>
                    <li>{meal.category}</li>
                    <li>{meal.calories}</li>
                </div>
            )}
        </ul>
    )
}

export default MealCard