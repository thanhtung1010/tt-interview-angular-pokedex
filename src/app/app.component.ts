import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutComponent, PokeDataComponent } from './components';
import { IApiObject, IPokeItem, IPokeType, ITableElement } from './interfaces';
import { PokeParams } from './models/poke.model';
import { APIService } from './services/api.service';
import { Helpers } from './helpers';
import { POKE_API_URL } from './enums/api.enum';
import { POKE_DATA_TYPE, SEARCH_POKE_TYPE } from './enums/common.enum';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { Observable, Subject, distinctUntilChanged, fromEvent, map, share, takeUntil } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  data = {
    pokeList: [] as IPokeItem[],
    detailSelected: null as IPokeItem | null,
    pokeTypes: [] as IPokeType[],
    meta: {
      last_page: 0,
    },
  };

  tableHeader: ITableElement<POKE_DATA_TYPE>[] = [
    {
      field: 'number',
      title: 'TABLE_HEADER.AVATAR',
      width: 150,
      align: 'center',
      sortOrder: 'asc',
      showSort: true,
    },
    {
      field: 'name',
      title: 'TABLE_HEADER.NAME',
      width: 100,
      align: 'left',
      sortOrder: null,
      showSort: false,
    },
    {
      field: 'total',
      title: 'TABLE_HEADER.TOTAL',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'hp',
      title: 'TABLE_HEADER.HP',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'attack',
      title: 'TABLE_HEADER.ATTACK',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'defense',
      title: 'TABLE_HEADER.DEFENSE',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'sp_atk',
      title: 'TABLE_HEADER.SP_ATK',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'sp_def',
      title: 'TABLE_HEADER.SP_DEF',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
    {
      field: 'speed',
      title: 'TABLE_HEADER.SPEED',
      width: 50,
      align: 'right',
      sortOrder: null,
      showSort: true,
    },
  ];
  params: PokeParams = new PokeParams(null);
  visibleDetail: boolean = false;
  hiddenScrollCls: string = 'tt-hidden_scroll';
  scrollEvent!: Observable<boolean>;
  unsubscribeNotifier: Subject<number> = new Subject();

  constructor(
    private apiService: APIService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.parseParam();
    this.initFilter();

    this.scrollEvent = fromEvent(window, 'scroll').pipe(
      takeUntil(this.unsubscribeNotifier),
      map(resp => {
        try {
          const scrollPosition = window.scrollY || document.documentElement.scrollTop;
          const bodyHeight = document.getElementsByTagName('body')[0].scrollHeight;

          return this.params.pageNumber < this.data.meta.last_page &&  bodyHeight - scrollPosition <= 1000;
        } catch (error) {
          console.error('appear on view: ', error);
          return false;
        }
      }),
      distinctUntilChanged(),
      share(),
    );

    if (this.scrollEvent) {
      this.scrollEvent.subscribe(resp => {
        if (resp) {
          this.onChangeParams(++this.params.pageNumber, 'scroll');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(Date.now());
    this.unsubscribeNotifier.complete();
  }

  scrollBodyTo() {
    document.documentElement.scrollTo({top: 0});
  }

  parseParam() {
    let object = Helpers.convertParamsToObject(Helpers.getParamString());

    if (object['sort']) {
      const existIdx = this.tableHeader.findIndex(head => object['sort'].includes(head.field))
      if (existIdx > -1) {
        this.tableHeader = this.tableHeader.map((head, index) => {
          if (index === existIdx) {
            head.sortOrder = object['sort'].includes('-') ? 'desc' : 'asc';
          } else {
            head.sortOrder = null;
          }
          return head;
        });
      }
    }

    if (object['pageNumber']) {
      object['pageNumber'] = 1;
    }

    this.params = new PokeParams(object);
    this.changeUrl();
  }

  changeUrl(isScroll?: boolean) {
    this.params = new PokeParams(this.params);
    const _params = this.params.getURLParams;
    this.router.navigate([], {
      queryParams: { ..._params },
    });
    this.getPokeData(isScroll);
  }

  getPokeData(isScroll?: boolean) {
    const _params = this.params.getAPIParams;
    const apiObject: IApiObject = {
      ...POKE_API_URL['GET_DATA'],
      url: `${POKE_API_URL['GET_DATA'].url}?${Helpers.convertObjectToParams(_params, true)}`
    }
    this.apiService.callApi(apiObject, {}).subscribe({
      next: resp => {
        if (isScroll) {
          this.data.pokeList = this.data.pokeList.concat(resp.data || []);
        } else {
          this.data.pokeList = resp.data || [];
        }

        if (resp.meta) {
          this.data.meta.last_page = resp.meta?.last_page || 0;
        }
      }
    });
  }

  getPokeType() {
    this.apiService.callApi(POKE_API_URL['GET_POKE_TYPE'], {}).subscribe({
      next: resp => {
        this.data.pokeTypes = resp.data || [];
      }
    })
  }

  initFilter() {
    this.getPokeType();
  }

  onChangeParams(val: any, type: SEARCH_POKE_TYPE) {
    switch (type) {
      case 'data':
        this.params.sort = val.sort;
        this.params.type = val.type;
        this.params.pageNumber = 1;
        break;

      case 'scroll':
        this.params.pageNumber = val;
        break;

      default:
        break;
    }
    this.changeUrl(type === 'scroll');
  }

  onClickPokeItem(item: IPokeItem) {
    this.data.detailSelected = item;
    this.visibleDetail = true;
    this.visibleScrollBody(false);
  }

  visibleScrollBody(scroll: boolean) {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      const currentCls = bodyElement.className;
      if (scroll) {
        bodyElement.className = `${currentCls.replace(this.hiddenScrollCls, '')}`;
      } else {
        bodyElement.className = `${currentCls} ${this.hiddenScrollCls}`;
      }
    } else {
      console.error('body element does not exist')
    }
  }
}
