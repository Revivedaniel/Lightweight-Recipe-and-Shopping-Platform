import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingListItem } from '../../models/shoppingListItem.model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-list-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './shopping-list-form.component.html',
  styleUrl: './shopping-list-form.component.scss'
})
export class ShoppingListFormComponent implements OnInit {
  shoppingListForm!: FormGroup;
  measurements: string[] = ['tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'ml', 'l', 'oz', 'lb', 'g', 'kg', 'in', 'cm', 'mm', 'pc', 'slice', 'clove', 'bunch', 'dozen', 'pack', 'dash', 'pinch', 'drop', 'stick', 'can', 'jar', 'bottle'];

  constructor(private fb: FormBuilder, private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      measurement: ['', Validators.required],
      inCart: [0]
    });
  }

  onSubmit() {
    if (this.shoppingListForm.valid) {
      const newItem: ShoppingListItem = {
        id: Date.now(),
        ...this.shoppingListForm.value
      };
      this.shoppingListService.addItem(newItem);
      this.shoppingListForm.reset();
    }
  }
}
