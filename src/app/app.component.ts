import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent, PokeDataComponent } from './components';
import { IPokeItem } from './interfaces';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PageLayoutComponent,
    PokeDataComponent,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  data = {
    pokeList: [] as IPokeItem[],
  };
  constructor() {}
}
