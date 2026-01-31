import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarContainerComponent } from '@esg-assistant-web/layout/side-navbar/feature';
import { HeaderContainerComponent } from '@esg-assistant-web/layout/header/feature';


@Component({
  selector: 'esg-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrl: './layout-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SideNavbarContainerComponent,
    HeaderContainerComponent,
  ],
})
export class LayoutWrapperComponent {}
