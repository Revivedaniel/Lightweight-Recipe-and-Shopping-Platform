import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicHeaderComponent, HeaderButton } from './shared/dynamic-header/dynamic-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DynamicHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  buttons: HeaderButton[] = [
    {
      functionalityType: 'Link',
      contentType: 'Text',
      content: 'Recipes',
      link: '/',
    },
    {
      functionalityType: 'Link',
      contentType: 'Text',
      content: 'Shopping',
      link: '/shopping',
    },
  ];
}
