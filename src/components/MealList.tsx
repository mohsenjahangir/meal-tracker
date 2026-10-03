import type Meal from "../types/meal"
import MealCard from "./MealCard"

const MealList = ({ meal }: { meal: Meal[] }) => {
    return (
        <div>
            <MealCard meal={meal.map((item) => item)} />
        </div>
    )
}

export default MealList