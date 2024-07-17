import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingComponent } from './shopping/shopping.component';

export const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent},
    {path: 'shopping', component: ShoppingComponent}
];
