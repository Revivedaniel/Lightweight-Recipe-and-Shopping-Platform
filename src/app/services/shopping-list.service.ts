import { Injectable } from '@angular/core';
import { ShoppingListItem } from '../models/shoppingListItem.model';
import { AppDB } from '../db';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: ShoppingListItem[] = [];
  shoppingListChanges = new Subject<ShoppingListItem[]>();
  constructor(private db: AppDB) {}

  getShoppingList(): Promise<ShoppingListItem[]> {
    return this.db.shoppingListItem.toArray();
  }

  async addItem(item: ShoppingListItem) {
    await this.db.shoppingListItem.add(item);
    this.handleShoppingListChange();
  }

  async updateItem(item: ShoppingListItem) {
    await this.db.shoppingListItem.put(item);
  }

  async removeItem(id: number) {
    await this.db.shoppingListItem.delete(id);
    this.handleShoppingListChange();
  }

  async clearList() {
    await this.db.shoppingListItem.clear();
    this.handleShoppingListChange();
  }

  async clearInCart() {
    await this.db.shoppingListItem.where('inCart').equals(1).delete();
    this.handleShoppingListChange();
  }

  async deleteItem(id: number) {
    await this.db.shoppingListItem.delete(id);
    this.handleShoppingListChange();
  }

  handleShoppingListChange() {
    this.getShoppingList().then((items) => {
      this.shoppingList = items;
      this.shoppingListChanges.next([...this.shoppingList]);
    });
  }
}
