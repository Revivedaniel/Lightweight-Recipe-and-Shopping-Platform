// db.ts
import Dexie, { Table } from 'dexie';
import { ShoppingListItem } from './models/shoppingListItem.model';
import { Recipe } from './models/recipe.model';

export class AppDB extends Dexie {
  shoppingListItem!: Table<ShoppingListItem, number>;
  recipe!: Table<Recipe, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      shoppingListItem: '++id, quantity, name, inCart, measurement',
      recipe: '++id, name, description, ingredients, instructions'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.shoppingListItem.bulkAdd([
      {
        id: 1,
        quantity: 1,
        name: 'Peaches',
        inCart: 0,
        measurement: ''
      },
      {
        id: 2,
        quantity: 8,
        name: 'Tomatoes',
        inCart: 0,
        measurement: ''
      },
      {
        id: 3,
        quantity: 3,
        name: 'Apples',
        inCart: 0,
        measurement: ''
      }
    ]);
  }

  async clear() {
    await db.shoppingListItem.clear();
  }
}

export const db = new AppDB();
