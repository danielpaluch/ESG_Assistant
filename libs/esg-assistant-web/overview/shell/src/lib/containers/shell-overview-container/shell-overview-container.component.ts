import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'esg-shell-overview-container',
  template: '<router-outlet/>',
  imports: [RouterOutlet],
})
export class ShellOverviewContainerComponent {}
