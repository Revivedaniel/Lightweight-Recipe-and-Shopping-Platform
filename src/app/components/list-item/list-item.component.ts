import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ShoppingListItem } from '../../models/shoppingListItem.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() item: ShoppingListItem = {
    id: 1,
    quantity: 1,
    name: 'Peaches',
    inCart: false,
    measurement: ''
  };

  toggleInCart() {
    // TODO: Make this update the IndexedDB
    this.item.inCart = !this.item.inCart;
  }
}
