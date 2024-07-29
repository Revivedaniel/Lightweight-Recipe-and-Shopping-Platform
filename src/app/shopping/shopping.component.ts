import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ShoppingListItem } from '../models/shoppingListItem.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { AppDB } from '../db';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ShoppingListFormComponent } from '../components/shopping-list-form/shopping-list-form.component';
import { ShoppingListVerificationComponent } from '../components/shopping-list-verification/shopping-list-verification.component';
import { Subscription } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { DataService } from '../services/data.service';
import { UploadDialogComponent } from '../components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ListItemComponent,
    MatListModule,
    MatMenuModule
  ],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
})
export class ShoppingComponent implements OnInit, OnDestroy {
  // Fix visual bug where you cannot scroll to the bottom of the shopping list.
  readonly dialog = inject(MatDialog);
  items: ShoppingListItem[] = [];
  shoppingListSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService, private db: AppDB, private dataService: DataService) {}

  ngOnInit(): void {
    // this.db.populate();
    this.shoppingListService.getShoppingList().then((items) => {
      this.items = items;
    });
    this.shoppingListSubscription = this.shoppingListService.shoppingListChanges.subscribe((items) => {
      this.items = items;
    });
  }

  clearList(): void {
    this.shoppingListService.clearList().then(() => {
      this.items = [];
    });
  }

  clearInCart(): void {
    this.shoppingListService.clearInCart().then(() => {
      this.shoppingListService.getShoppingList().then((items) => {
        this.items = items;
      });
    });
  }

  openAddDialog(): void {
    this.dialog.open(ShoppingListFormComponent, {
      width: '250px'
    });
  }

  openVerifyDialog() {
    this.dialog.open(ShoppingListVerificationComponent, {
      width: '250px',
    });
  }

  openUploadDialog(): void {
    this.dialog.open(UploadDialogComponent, {
      data: { resource: 'list' },
    })
  }

  downloadList(): void {
    this.shoppingListService.getShoppingList().then((items) => {
      this.dataService.downloadJson(items, 'shopping-list');
    })
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
