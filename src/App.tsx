import MealList from "./components/MealList"
import type Meal from "./types/meal"

const App = () => {

  const meal: Meal[] = [
    {
      id: 1,
      name: 'chicken',
      category: 'dinner',
      calories: 345
    },
    {
      id: 2,
      name: 'pasta',
      category: 'lunch',
      calories: 550
    },
    {
      id: 3,
      name: 'Omelette',
      category: 'breakfast',
      calories: 400
    }
  ]

  return (
    <div><MealList meal={meal} /></div>
  )
}

export default App