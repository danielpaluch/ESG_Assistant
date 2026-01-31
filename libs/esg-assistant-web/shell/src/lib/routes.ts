import { Route } from '@angular/router';
import { ShellContainerComponent } from './containers/shell-container/shell-container.component';
import { SHELL_ROUTES_PATHS } from './consts/shell-routes-paths.const';
export const webShellRoutes: Route[] = [
  {
    path: '',
    component: ShellContainerComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@esg-assistant-web/layout/feature').then(
            (c) => c.LayoutWrapperComponent,
          ),
        children: [
          {
            path: SHELL_ROUTES_PATHS.OVERVIEW,
            loadChildren: () =>
              import('@esg-assistant-web/overview/shell').then(
                (m) => m.overviewShellRoutes,
              ),
          },
          {
            path: SHELL_ROUTES_PATHS.ESG_CREATOR,
            loadChildren: () =>
              import('@esg-assistant-web/esg-creator/shell').then(
                (m) => m.esgCreatorShellRoutes,
              ),
          },
          {
            path: '*',
            redirectTo: SHELL_ROUTES_PATHS.OVERVIEW,
            pathMatch: 'full',
          }
        ],
      },
    ],
  },
];
