import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POKE_DATA_TYPE } from '../../enums/common.enum';
import { IPokeItem, ITableElement } from '../../interfaces';
import { AvatarPokeComponent } from '../avatar-poke/avatar-poke.component';

@Component({
  selector: 'tt-poke-data',
  templateUrl: './poke-data.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    AvatarPokeComponent,
  ]
})
export class PokeDataComponent implements OnInit {
  @Input({
    required: true
  }) data: IPokeItem[] = [];

  tableHeader: ITableElement<POKE_DATA_TYPE>[] = [
    {
      field: 'avatar',
      title: 'TABLE_HEADER.AVATAR',
      width: 100,
    },
    {
      field: 'name',
      title: 'TABLE_HEADER.NAME',
      width: 150,
    },
    {
      field: 'total',
      title: 'TABLE_HEADER.TOTAL',
      width: 100,
    },
    {
      field: 'hp',
      title: 'TABLE_HEADER.HP',
      width: 100,
    },
    {
      field: 'attack',
      title: 'TABLE_HEADER.ATTACK',
      width: 100,
    },
    {
      field: 'defense',
      title: 'TABLE_HEADER.DEFENSE',
      width: 100,
    },
    {
      field: 'sp_atk',
      title: 'TABLE_HEADER.SP_ATK',
      width: 100,
    },
    {
      field: 'sp_def',
      title: 'TABLE_HEADER.SP_DEF',
      width: 100,
    },
    {
      field: 'speed',
      title: 'TABLE_HEADER.SPEED',
      width: 100,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
