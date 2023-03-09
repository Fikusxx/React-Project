import React from 'react'
import styles from './AvailableMeals.module.css'
import { Card } from "../UI/Card"
import { MealItem } from './MealItem/MealItem';


async function fetchMeals()
{
  const response = await fetch("https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
  if (response.ok === false) 
  {
    throw new Error("Error while fetching data...");
  }

  const data = await response.json();
  const loadedMeals = [];

  for (const key in data)
  {
    const meal = { id: key, description: data[key].description, name: data[key].name, price: data[key].price };
    loadedMeals.push(meal);
  }

  return loadedMeals;
}

function AvailableMeals()
{
  const [meals, setMeals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() =>
  {
    setIsLoading(true);
    setError(null);

    fetchMeals()
      .then(data => setMeals(data))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [])

  if (isLoading)
  {
    return (
      <section className={ styles.meals_loading }>
        <div>Loading...</div>
      </section>
    )
  }

  if (error)
  {
    return (
      <section className={ styles.meals_error }>
        <div>{ error }</div>
      </section>
    )
  }

  const mealsList = meals.map((meal) =>
  {
    return <MealItem key={ meal.id } id={ meal.id } name={ meal.name } description={ meal.description } price={ meal.price } />
  });

  return (
    <section className={ styles.meals }>
      <Card>
        <ul>{ mealsList }</ul>
      </Card>
    </section>
  )
}

export { AvailableMeals };
