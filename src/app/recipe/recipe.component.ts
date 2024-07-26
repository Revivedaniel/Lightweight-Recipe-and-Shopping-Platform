import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list.service';
import {MatMenuModule} from '@angular/material/menu';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  // aquire the recipe id from the :id param
  // get the recipe object from the recipe service

  readonly dialog = inject(MatDialog);
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

  editRecipe(): void {
    this.router.navigate([`/recipes/${this.recipe.id}/edit`]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(this.recipe.id).then(() => {
          this.router.navigate(['/recipes']);
        });
      }
    });
  }
}
