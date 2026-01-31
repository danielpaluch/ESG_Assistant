import {
  ChangeDetectionStrategy,
  Component, signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'esg-header-container',
  templateUrl: './header-container.component.html',
  styleUrl: './header-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class HeaderContainerComponent {
  breadcrumbs =signal<{ url: string; label: string }[]>([]);
}
