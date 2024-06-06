import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutComponent, PokeDataComponent } from './components';
import { IApiObject, IPokeItem } from './interfaces';
import { PokeParams } from './models/poke.model';
import { APIService } from './services/api.service';
import { Helpers } from './helpers';
import { POKE_API_URL } from './enums/api.enum';
import { SEARCH_POKE_TYPE } from './enums/common.enum';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PageLayoutComponent,
    PokeDataComponent,
    PokeDetailComponent,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data = {
    pokeList: [] as IPokeItem[],
    detailSelected: null as IPokeItem | null,
  };
  params: PokeParams = new PokeParams(null);
  visibleDetail: boolean = false;

  constructor(
    private apiService: APIService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.parseParam();
  }

  parseParam() {
    let object = Helpers.convertParamsToObject(Helpers.getParamString());
    this.params = new PokeParams(object);
    this.getPokeData();
  }

  changeUrl() {
    this.params = new PokeParams(this.params);
    const _params = this.params.getURLParams;
    this.router.navigate([], {
      queryParams: { ..._params },
    });
    this.getPokeData();
  }

  getPokeData() {
    const _params = this.params.getAPIParams;
    const apiObject: IApiObject = {
      ...POKE_API_URL['GET_DATA'],
      url: `${POKE_API_URL['GET_DATA'].url}?${Helpers.convertObjectToParams(_params, true)}`
    }
    this.apiService.callApi(apiObject, {}).subscribe({
      next: resp => {
        this.data.pokeList = resp.data || [];
      }
    });
  }

  onChangeParams(val: any, type: SEARCH_POKE_TYPE) {
    switch (type) {
      case 'sort':
        this.params.sort = val;
        break;

      default:
        break;
    }
    this.changeUrl();
  }

  onClickPokeItem(item: IPokeItem) {
    this.data.detailSelected = item;
    this.visibleDetail = true;
  }
}
