import { Injectable, signal } from '@angular/core';
import { SHELL_ROUTES_PATHS } from '@esg-assistant-web/shell';

@Injectable()
export class SideNavbarItemsService {
  readonly sideNavBarItems = signal([
    {
      url: SHELL_ROUTES_PATHS.OVERVIEW,
      label: 'Overview',
      icon: 'home',
    },
    {
      url: SHELL_ROUTES_PATHS.ESG_CREATOR,
      label: 'Emission creator',
      icon: 'folder',
    }
  ])
}