import { Route } from '@angular/router';
import {
  ShellEsgCreatorContainerComponent
} from './containers/shell-esg-creator-container/shell-esg-creator-container.component';

export const esgCreatorShellRoutes: Route[] = [
  {
    path: '',
    component: ShellEsgCreatorContainerComponent,
  }
]