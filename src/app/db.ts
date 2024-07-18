// db.ts
import Dexie, { Table } from 'dexie';
import { ShoppingListItem } from './models/shoppingListItem.model';

export class AppDB extends Dexie {
  shoppingListItem!: Table<ShoppingListItem, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      shoppingListItem: '++id, quantity, name, inCart, measurement',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.shoppingListItem.bulkAdd([
      {
        id: 1,
        quantity: 1,
        name: 'Peaches',
        inCart: false,
        measurement: ''
      },
      {
        id: 2,
        quantity: 8,
        name: 'Tomatoes',
        inCart: false,
        measurement: ''
      },
      {
        id: 3,
        quantity: 3,
        name: 'Apples',
        inCart: false,
        measurement: ''
      }
    ]);
  }

  async clear() {
    await db.shoppingListItem.clear();
  }
}

export const db = new AppDB();
