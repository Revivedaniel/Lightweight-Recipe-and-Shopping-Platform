import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent implements OnInit {
  addingIngredient = false;
  addingInstruction = false;
  recipeForm!: FormGroup;
  measurements: string[] = [
    'tsp',
    'tbsp',
    'fl oz',
    'cup',
    'pt',
    'qt',
    'gal',
    'ml',
    'l',
    'oz',
    'lb',
    'g',
    'kg',
    'in',
    'cm',
    'mm',
    'pc',
    'slice',
    'clove',
    'bunch',
    'dozen',
    'pack',
    'dash',
    'pinch',
    'drop',
    'stick',
    'can',
    'jar',
    'bottle',
  ];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
      newIngredient: this.createIngredientGroup(),
      instructions: this.fb.array([]),
      newInstruction: this.createInstructionGroup(),
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  createIngredientGroup(): FormGroup {
    return this.fb.group({
      id: [Date.now()],
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      measurement: ['', Validators.required],
      inCart: [0],
    });
  }

  createInstructionGroup(): FormGroup {
    return this.fb.group({
      instruction: ['', Validators.required],
    });
  }

  addIngredient(): void {
    if (!this.addingIngredient) {
      this.addingIngredient = true;
    } else {
      const newIngredientGroup = this.recipeForm.get(
        'newIngredient'
      ) as FormGroup;
      this.ingredients.push(this.fb.group(newIngredientGroup.value));
      newIngredientGroup.reset({
        id: Date.now(),
        name: '',
        quantity: 1,
        measurement: '',
        inCart: 0,
      });
      this.addingIngredient = false;
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  editIngredient(index: number): void {
    const ingredient = this.ingredients.at(index).value;
    const newIngredientGroup = this.recipeForm.get(
      'newIngredient'
    ) as FormGroup;
    newIngredientGroup.setValue({
      id: ingredient.id,
      name: ingredient.name,
      quantity: ingredient.quantity,
      measurement: ingredient.measurement,
      inCart: ingredient.inCart,
    });
    this.removeIngredient(index);
  }

  addInstruction(): void {
    if (!this.addingInstruction) {
      this.addingInstruction = true;
    } else {
      const newInstructionGroup = this.recipeForm.get(
        'newInstruction'
      ) as FormGroup;
      this.instructions.push(this.fb.group(newInstructionGroup.value));
      newInstructionGroup.reset({ instruction: '' });
      this.addingInstruction = false;
    }
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  editInstruction(index: number): void {
    const instruction = this.instructions.at(index).value;
    const newInstructionGroup = this.recipeForm.get(
      'newInstruction'
    ) as FormGroup;
    newInstructionGroup.setValue({ instruction: instruction.instruction });
    this.removeInstruction(index);
  }

  onSubmit(): void {
    if (
      this.recipeForm.valid ||
      (this.recipeForm.get('name')?.value !== '' &&
        this.recipeForm.get('description')?.value !== '' &&
        this.ingredients.length > 0 &&
        this.instructions.length > 0)
    ) {
      // Extract values from the form
      const formValue = this.recipeForm.value;

      // Transform instructions into an array of strings
      const instructions = formValue.instructions.map(
        (inst: any) => inst.instruction
      );

      const newRecipe: Recipe = {
        id: Date.now(),
        name: formValue.name,
        description: formValue.description,
        ingredients: formValue.ingredients,
        instructions: instructions, // Use the transformed array of strings
      };

      const newRecipeId = this.recipeService.addRecipe(newRecipe);
      this.recipeForm.reset();
      this.resetFormArrays();
      this.router.navigate(['/recipes', newRecipeId]);
    } else {
      // Handle the error case where no ingredients or instructions have been added
      alert('Please add at least one ingredient and one instruction.');
    }
  }
  private resetFormArrays() {
    this.recipeForm.setControl('ingredients', this.fb.array([]));
    this.recipeForm.setControl('instructions', this.fb.array([]));
    this.recipeForm.setControl('newIngredient', this.createIngredientGroup());
    this.recipeForm.setControl('newInstruction', this.createInstructionGroup());
  }
}
