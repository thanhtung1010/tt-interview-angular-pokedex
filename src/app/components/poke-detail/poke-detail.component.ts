import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, input } from '@angular/core';
import { IPokeItem } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { AvatarPokeComponent } from '../avatar-poke/avatar-poke.component';
import { getYear } from 'date-fns';
import { POKE_DATA_TYPE } from '../../enums/common.enum';
import { TranslateModule } from '@ngx-translate/core';
import { detailFloatIn, detailFloatOut } from '../../animations';

@Component({
  selector: 'tt-poke-detail',
  templateUrl: './poke-detail.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AvatarPokeComponent,
    TranslateModule,
  ],
  animations: [
    detailFloatIn,
    detailFloatOut,
  ]
})
export class PokeDetailComponent implements OnInit, OnChanges {
  @Input({required: true}) pokeItem!: IPokeItem | null;
  @Input({required: true}) visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownEscape() {
    this.visibleDetail(false);
  }

  infos: Array<{
    label: string,
    field: POKE_DATA_TYPE,
    value: any
  }> = [
    {
      field: 'hp',
      label: 'TABLE_HEADER.HP',
      value: null
    },
    {
      field: 'attack',
      label: 'TABLE_HEADER.ATTACK',
      value: null
    },
    {
      field: 'defense',
      label: 'TABLE_HEADER.DEFENSE',
      value: null
    },
    {
      field: 'sp_atk',
      label: 'TABLE_HEADER.SP_ATK',
      value: null
    },
    {
      field: 'sp_def',
      label: 'TABLE_HEADER.SP_DEF',
      value: null
    },
    {
      field: 'speed',
      label: 'TABLE_HEADER.SPEED',
      value: null
    },
    {
      field: 'total',
      label: 'TABLE_HEADER.TOTAL',
      value: null
    },
  ];
  currentYear: number = getYear(new Date());
  detailtCls: string = 'tt-detail';
  absCls: string = 'tt-absolute';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokeItem'] && changes['pokeItem'].currentValue !== null) {
      this.parseInfo();
    }
    if (changes['visible'] && changes['visible'].currentValue) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition === 0) {
        this.detailtCls = `${this.detailtCls} ${this.absCls}`
      } else {
        this.detailtCls = this.detailtCls.replace(this.absCls, '').trim();
      }
    }
  }

  parseInfo() {
    this.infos = this.infos.map(elm => {
      if (this.pokeItem) elm.value = this.pokeItem[elm.field];

      return elm;
    });
  }

  visibleDetail(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }

}
