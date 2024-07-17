import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, ListItemComponent, MatListModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {
  items = [
    {
      qty: 1,
      name: 'Peaches',
      inCart: false
    },
    {
      qty: 8,
      name: 'Tomatoes',
      inCart: false
    },
    {
      qty: 3,
      name: 'Apples',
      inCart: false
    }
  ];
}
