import { Injectable } from '@angular/core';
import { ShoppingListItem } from '../models/shoppingListItem.model';
import { AppDB } from '../db';
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: ShoppingListItem[] = [];
  constructor(private db: AppDB) {}

  getShoppingList(): Promise<ShoppingListItem[]> {
    return this.db.shoppingListItem.toArray();
  }

  updateItem(item: ShoppingListItem): PromiseExtended<number> {
    return this.db.shoppingListItem.put(item);
  }

  clearList(): Promise<void> {
    return this.db.shoppingListItem.clear();
  }

  clearInCart(): PromiseExtended<number> {
    return this.db.shoppingListItem.where('inCart').equals(1).delete();
  }
}
