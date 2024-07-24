import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  // aquire the recipe id from the :id param
  // get the recipe object from the recipe service

  recipeId: string | null = '';
  recipe: Recipe = {
    id: 1,
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
  };
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
    });

    if (this.recipeId) {
      this.recipeService.getRecipe(Number(this.recipeId)).then((recipe) => {
        if (recipe) {
          this.recipe = recipe;
        }
      });
    }
  }

  // navigate to the recipes page
  backToRecipes(): void {
    this.router.navigate(['/recipes']);
  }

  addToShoppingList(): void {
    this.shoppingListService.addManyItems(this.recipe.ingredients);
  }
}
