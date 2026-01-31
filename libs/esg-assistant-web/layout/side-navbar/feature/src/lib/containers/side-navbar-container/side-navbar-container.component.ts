import {
  ChangeDetectionStrategy,
  Component, inject, signal
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { SideNavbarItemsService } from '@esg-assistant-web/layout/side-navbar/application';

@Component({
  selector: 'esg-side-navbar-container',
  templateUrl: './side-navbar-container.component.html',
  styleUrl: './side-navbar-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ RouterLink, MatIcon, RouterLinkActive],
  providers: [
    SideNavbarItemsService,
  ]
})
export class SideNavbarContainerComponent {
  private readonly sideNavbarItemsService = inject(SideNavbarItemsService);
  readonly navItems =  this.sideNavbarItemsService.sideNavBarItems;
}
