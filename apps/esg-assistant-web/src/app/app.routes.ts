import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import(
        '@esg-assistant-web/shell'
        ).then((m) => m.webShellRoutes),
  },
];
