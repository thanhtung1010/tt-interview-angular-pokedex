import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent, PokeDataComponent } from './components';
import { IPokeItem } from './interfaces';
import { PokeParams } from './models/poke.model';
import { APIService } from './services/api.service';
import { Helpers } from './helpers';
import { POKE_API_URL } from './enums/api.enum';

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
export class AppComponent implements OnInit {
  data = {
    pokeList: [] as IPokeItem[],
  };
  params: PokeParams = new PokeParams(null);

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.parseParam();
  }

  parseParam() {
    let object = Helpers.convertParamsToObject(Helpers.getParamString());
    this.params = new PokeParams(object);
    this.getPokeData();
  }

  getPokeData() {
    const _params = this.params.getAPIParams;
    this.apiService.callApi(POKE_API_URL['GET_DATA'], _params).subscribe({
      next: resp => {
        this.data.pokeList = resp.data || [];
      }
    });
  }
}
