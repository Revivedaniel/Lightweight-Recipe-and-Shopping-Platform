import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteActivatedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RecipeItemComponent } from '../components/recipe-item/recipe-item.component';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    RecipeItemComponent,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  myControl = new FormControl<string | Recipe>('');
  options: Recipe[] = [];
  filteredOptions!: Observable<Recipe[]>;
  recipes: Recipe[] = [];
  recipeSubscription!: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    this.recipeService.getRecipes().then((recipes) => {
      this.recipes = recipes;
      this.options = recipes;
    });

    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.options = recipes;
      }
    );
  }

  displayFn(recipe: Recipe): string {
    return recipe && recipe.name ? recipe.name : '';
  }

  private _filter(name: string): Recipe[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  // navigate to the recipes/:id page
  viewRecipe(id: number): void {
    this.router.navigate(['/recipes', id]);
  }

  addRecipe(): void {
    this.router.navigate(['/recipes/new']);
  }

  filterRecipes(): void {
    const name = this.myControl.value;
    if (name) {
      this.recipes = this.options.filter((recipe) => recipe.name === name);
    } else {
      this.recipes = this.options;
    }
  }

  clearSelection(): void {
    this.myControl.setValue('');
    this.recipes = this.options;
  }

  matOnChange(event: MatAutocompleteActivatedEvent) {
    this.viewRecipe(event.option?.value.id);
  }

  downloadRecipes(): void {
    this.recipeService.getRecipes().then((recipes) => {
      this.dataService.downloadJson(recipes, 'recipes');
    });
  }
  
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
