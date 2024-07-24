import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  // aquire the recipe id from the :id param
  // get the recipe object from the recipe service

  recipeId: string | null = '';
  recipe: Recipe = { id: 1, name: '', description: '', ingredients: [], instructions: [] }; 
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
    });

    if (this.recipeId) {
      const recipe = this.recipeService.getRecipe(Number(this.recipeId));
      if (recipe) {
        this.recipe = recipe;
        console.log(recipe)
      }
    }
  }
}
