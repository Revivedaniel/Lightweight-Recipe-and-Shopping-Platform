import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = { id: 1, name: '', description: '', ingredients: [], instructions: [] };
}
