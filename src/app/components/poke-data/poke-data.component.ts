import { Component, OnInit } from '@angular/core';
import { ITableElement } from '../../interfaces';
import { POKE_DATA_TYPE } from '../../enums/common.enum';

@Component({
  selector: 'tt-poke-data',
  templateUrl: './poke-data.component.html',
})
export class PokeDataComponent implements OnInit {
  tableHeader: ITableElement<POKE_DATA_TYPE>[] = [];

  constructor() { }

  ngOnInit() {
  }

}
