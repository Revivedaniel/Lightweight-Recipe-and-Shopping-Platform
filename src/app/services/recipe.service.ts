import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';
import { AppDB } from '../db';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = []
  recipesChanged = new Subject<Recipe[]>();
  constructor(private db: AppDB) { }

  getRecipes(): Promise<Recipe[]> {
    return this.db.recipe.toArray();
  }

  getRecipe(id: number): Promise<Recipe | undefined> {
    return this.db.recipe.get(id);
  }

  async addRecipe(recipe: Recipe): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.recipe.add(recipe).then((id) => {
        this.handleRecipeChange();
        resolve(id);
      });
    });
  }

  async addRecipes(recipes: Recipe[]): Promise<number[]> {
    return new Promise(async (resolve, reject) => {
      await this.db.recipe.bulkAdd(recipes);
      this.handleRecipeChange();
      resolve(recipes.map((recipe) => recipe.id));
    });
  }

  async updateRecipe(recipe: Recipe): Promise<number> {
    return new Promise(async (resolve, reject) => {
      await this.db.recipe.put(recipe);
      this.handleRecipeChange();
      resolve(recipe.id);
    });
  }

  async deleteRecipe(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.recipe.delete(id).then(() => {
        this.handleRecipeChange();
        resolve();
      });
    });
  }

  handleRecipeChange() {
    this.getRecipes().then((recipes) => {
      this.recipes = recipes;
      this.recipesChanged.next([...this.recipes]);
    });
  }
}
