import {
  addCategory,
  addIngredient,
  addMeal,
  findCategoryByName,
  findIngredientByName,
  getAllMeals,
  linkMealCategory,
  linkMealIngredients,
} from '../models/mealModel.js';

const handleAddMeal = async (req, res) => {
  /*
  1. add meal
  2. check if category exists
  3. ? add category
  4. link meal-category
  5. loop ingredients and check if exists by name
  6. ? add ingredient and push to empty list
  7. loop the new list and link ingredients to meal
  */

  const {
    mealName,
    mealPrice,
    mealDescription,
    categoryName,
    categoryDescription,
    ingredients = [],
  } = req.body;

  const meal = {name: mealName, price: mealPrice, description: mealDescription};
  const category = {name: categoryName, description: categoryDescription};

  try {
    const newMeal = await addMeal(meal);

    let categoryFound = await findCategoryByName(categoryName);

    if (!categoryFound) {
      categoryFound = await addCategory(category);
    }

    await linkMealCategory(newMeal.id, categoryFound.id);

    let ingredientIds = [];

    for (const ingredient of ingredients) {
      let foundIngredient = await findIngredientByName(ingredient.name);

      if (!foundIngredient) {
        foundIngredient = await addIngredient(ingredient);
      }

      ingredientIds.push(foundIngredient.id);
    }

    await linkMealIngredients(newMeal.id, ingredientIds);
    res.status(201).json({
      message: 'Meal, category and ingredients added successfully',
      mealId: newMeal.id,
      mealCategory: categoryFound.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to add meal'});
  }
};

const handleGetAllMeals = async (req, res) => {
  try {
    const meals = await getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to fetch meals'});
  }
};

export {handleAddMeal, handleGetAllMeals};
