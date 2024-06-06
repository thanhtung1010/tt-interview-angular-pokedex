import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POKE_DATA_TYPE } from '../../enums/common.enum';
import { IPokeItem, ITableElement } from '../../interfaces';
import { AvatarPokeComponent } from '../avatar-poke/avatar-poke.component';
import { SortHeaderComponent } from '../sort-header/sort-header.component';

@Component({
  selector: 'tt-poke-data',
  templateUrl: './poke-data.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    AvatarPokeComponent,
    NgOptimizedImage,
    SortHeaderComponent,
  ]
})
export class PokeDataComponent implements OnInit {
  @Input({
    required: true
  }) data: IPokeItem[] = [];

  @Output() paramsChange: EventEmitter<string> = new EventEmitter();
  @Output() detailChange: EventEmitter<IPokeItem> = new EventEmitter();

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
  defaultSortValue: string = 'number';

  constructor() { }

  ngOnInit() {
  }

  onClickSortHeader(index: number, header: ITableElement<POKE_DATA_TYPE>) {
    if (header.sortOrder === null) {
      this.tableHeader = this.tableHeader.map((head, _index) => {
        if (head.field === 'number') {
          head.sortOrder = 'asc';
        } else {
          head.sortOrder = null;
        }

        return head;
      });
    } else {
      this.tableHeader = this.tableHeader.map((head, _index) => {
        if (_index !== index) {
          head.sortOrder = null;
        }

        return head;
      });
    }

    this.parseSortHeader(header);
  }

  parseSortHeader(header: ITableElement<POKE_DATA_TYPE>) {
    let _value: string = '';
    if (header.sortOrder === null) {
      _value = 'number'
    } else {
      switch (header.sortOrder) {
        case 'asc':
          _value = header.field;
          break;

        case 'desc':
          _value = '-' + header.field;
          break;

        default:
          break;
      }
    }

    this.emitParamsChange(_value);
  }

  onClickPokeItem(item: IPokeItem) {
    this.detailChange.emit(item);
  }

  emitParamsChange(val: string) {
    this.paramsChange.emit(val);
  }

}
