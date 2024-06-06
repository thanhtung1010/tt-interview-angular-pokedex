import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { POKE_DATA_TYPE } from '../../enums/common.enum';
import { IPokeItem, IPokeType, ITableElement } from '../../interfaces';
import { PokeParams } from '../../models/poke.model';
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
    FormsModule,
  ]
})
export class PokeDataComponent implements OnInit {
  @Input({
    required: true
  }) data: IPokeItem[] = [];
  @Input({
    required: true
  }) pokeTypes: IPokeType[] = [];
  @Input({
    required: true
  }) params: PokeParams = new PokeParams(null);
  @Input({
    required: true
  }) tableHeader: ITableElement<POKE_DATA_TYPE>[] = [];

  @Output() paramsChange: EventEmitter<PokeParams> = new EventEmitter();
  @Output() detailChange: EventEmitter<IPokeItem> = new EventEmitter();
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

    this.params.sort = _value;
    this.emitParamsChange();
  }

  onSelectType(value: number) {
    this.params.type = value;
    this.emitParamsChange();
  }

  onClickPokeItem(item: IPokeItem) {
    this.detailChange.emit(item);
  }

  emitParamsChange() {
    this.params = new PokeParams(this.params);
    this.paramsChange.emit(this.params);
  }

}
