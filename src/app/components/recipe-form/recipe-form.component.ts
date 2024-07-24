import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  measurements: string[] = ['tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'ml', 'l', 'oz', 'lb', 'g', 'kg', 'in', 'cm', 'mm', 'pc', 'slice', 'clove', 'bunch', 'dozen', 'pack', 'dash', 'pinch', 'drop', 'stick', 'can', 'jar', 'bottle'];

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([this.createIngredient()]),
      instructions: this.fb.array([this.createInstruction()])
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      id: Date.now(),
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      measurement: ['', Validators.required],
      inCart: [0]
    });
  }

  createInstruction(): FormGroup {
    return this.fb.group({
      instruction: ['', Validators.required]
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  addInstruction(): void {
    this.instructions.push(this.createInstruction());
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      // Extract values from the form
      const formValue = this.recipeForm.value;
  
      // Transform instructions into an array of strings
      const instructions = formValue.instructions.map((inst: any) => inst.instruction);
  
      const newRecipe: Recipe = {
        id: Date.now(),
        name: formValue.name,
        description: formValue.description,
        ingredients: formValue.ingredients,
        instructions: instructions  // Use the transformed array of strings
      };
  
      this.recipeService.addRecipe(newRecipe);
      this.recipeForm.reset();
      this.resetFormArrays();
    }
  }
  
  private resetFormArrays() {
    this.recipeForm.setControl('ingredients', this.fb.array([this.createIngredient()]));
    this.recipeForm.setControl('instructions', this.fb.array([this.createInstruction()]));
  }
}
