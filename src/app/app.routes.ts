import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent},
    {path: 'recipes/new', component: RecipeFormComponent},
    {path: 'recipes/:id', component: RecipeComponent},
    {path: 'recipes/:id/edit', component: RecipeFormComponent},
    {path: 'shopping', component: ShoppingComponent},
];
