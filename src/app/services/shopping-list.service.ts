import { Injectable } from '@angular/core';
import { ShoppingListItem } from '../models/shoppingListItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private shoppingList: ShoppingListItem[] = [];
  constructor() { }
}
