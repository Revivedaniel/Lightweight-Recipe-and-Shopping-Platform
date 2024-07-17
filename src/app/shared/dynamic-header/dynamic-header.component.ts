import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface HeaderButton {
  functionalityType: 'Link' | 'Button';
  contentType: 'Icon' | 'Text';
  content: string;
  link?: string;
  function?: () => void;
}

@Component({
  selector: 'app-dynamic-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './dynamic-header.component.html',
  styleUrl: './dynamic-header.component.scss',
})
export class DynamicHeaderComponent {
  // TODO: Add support for the jumbotron to be a clickable link
  // Jumbotron Inputs
  @Input() jumbotronText: string = '';
  @Input() includeJumbotron: boolean = true;
  // TODO: Add support for aligning the jumbotron
  // @Input() alignJumbotron: "left" | "center" | "right" = "center";
  // Button Inputs
  // TODO: Style the buttons
  @Input() buttons: HeaderButton[] = [];
  @Input() alignHeader: 'top' | 'bottom' = 'top';
}
