import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    {
      id: 1,
      name: 'Recipe 1',
      description: 'This is a description for recipe 1',
      ingredients: [
        {
          id: 1,
          name: 'Ingredient 1',
          quantity: 1,
          measurement: 'cup',
          inCart: 0
        },
        {
          id: 2,
          name: 'Ingredient 2',
          quantity: 2,
          measurement: 'tbsp',
          inCart: 0
        }
      ],
      instructions: ['Step 1', 'Step 2', 'Step 3']
    },
    {
      id: 2,
      name: 'Recipe 2',
      description: 'This is a description for recipe 2',
      ingredients: [
        {
          id: 3,
          name: 'Ingredient 3',
          quantity: 1,
          measurement: 'cup',
          inCart: 0
        },
        {
          id: 4,
          name: 'Ingredient 4',
          quantity: 2,
          measurement: 'tbsp',
          inCart: 0
        }
      ],
      instructions: ['Step 1', 'Step 2', 'Step 3']
    }
  ]
  constructor() { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    return recipe.id;
  }
}
