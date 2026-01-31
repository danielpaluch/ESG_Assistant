import { Route } from '@angular/router';
import {
  ShellOverviewContainerComponent
} from './containers/shell-overview-container/shell-overview-container.component';

export const overviewShellRoutes: Route[] = [
  {
    path: '',
    component: ShellOverviewContainerComponent,
    children: [

    ]
  }
]