import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ITableElement } from '../../interfaces';
import { POKE_DATA_TYPE } from '../../enums/common.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-sort-header',
  templateUrl: './sort-header.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ]
})
export class SortHeaderComponent implements OnInit {
  @Input({required: true}) header!: ITableElement<POKE_DATA_TYPE>;
  @Output() headerChange: EventEmitter<ITableElement<POKE_DATA_TYPE>> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickHeader() {
    if (!this.header.showSort) {
      return;
    }

    switch (this.header.sortOrder) {
      case null:
        this.header.sortOrder = 'asc';
        break;

      case 'asc':
        this.header.sortOrder = 'desc';
        break;

      case 'desc':
        this.header.sortOrder = null;
        break;

      default:
        break;
    }
    this.emitHeader();
  }

  emitHeader() {
    this.headerChange.emit(this.header);
  }

}
