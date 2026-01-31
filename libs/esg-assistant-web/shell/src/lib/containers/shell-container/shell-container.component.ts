import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'esg-shell-component',
  template: '<router-outlet/>',
  imports: [RouterOutlet],
})
export class ShellContainerComponent {}
