import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingListItem } from '../../models/shoppingListItem.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shopping-list-verification',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './shopping-list-verification.component.html',
  styleUrl: './shopping-list-verification.component.scss',
})
export class ShoppingListVerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  items!: ShoppingListItem[];
  currentItem!: ShoppingListItem | null;
  currentIndex: number = 0;
  measurements: string[] = [' ', 'tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'ml', 'l', 'oz', 'lb', 'g', 'kg', 'in', 'cm', 'mm', 'pc', 'slice', 'clove', 'bunch', 'dozen', 'pack', 'dash', 'pinch', 'drop', 'stick', 'can', 'jar', 'bottle'];

  constructor(
    private fb: FormBuilder,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.shoppingListService.getShoppingList().then((items) => {
      this.items = items;
      this.currentItem = this.items[this.currentIndex];
      this.verificationForm = this.fb.group({
        hasItem: ['', Validators.required],
        quantity: [this.currentItem?.quantity, Validators.min(1)],
        measurement: [this.currentItem?.measurement],
      });
    });
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.verificationForm.value);
    if (this.verificationForm.valid) {
      const hasItem = this.verificationForm.value.hasItem;
      const updatedQuantity = this.verificationForm.value.quantity;
      const updatedMeasurement = this.verificationForm.value.measurement;
      console.log(hasItem, updatedQuantity);

      if (hasItem === 'yes' && this.currentItem) {
        if (updatedQuantity && updatedQuantity > 0) {
          this.currentItem.quantity = updatedQuantity;
          this.currentItem.measurement = updatedMeasurement;
          this.shoppingListService.updateItem(this.currentItem);
        } else {
          this.shoppingListService.removeItem(this.currentItem.id);
        }
      }

      this.moveToNextItem();
    }
  }

  moveToNextItem() {
    this.currentIndex++;
    if (this.currentIndex < this.items.length) {
      this.currentItem = this.items[this.currentIndex];
      this.verificationForm.reset({
        hasItem: '',
        quantity: this.currentItem.quantity,
      });
    } else {
      this.currentItem = null;
    }
  }
}
