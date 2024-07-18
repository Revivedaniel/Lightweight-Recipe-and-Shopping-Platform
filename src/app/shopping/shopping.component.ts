import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ShoppingListItem } from '../models/shoppingListItem.model';
import { ShoppingListService } from '../services/shopping-list.service';

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
  ],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
})
export class ShoppingComponent implements OnInit {
  items: ShoppingListItem[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.getShoppingList().then((items) => {
      this.items = items;
    });
  }
}
