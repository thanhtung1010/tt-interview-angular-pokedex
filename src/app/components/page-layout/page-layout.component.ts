import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tt-page-layout',
  templateUrl: './page-layout.component.html',
  standalone: true,
  imports: [
    TranslateModule,
  ]
})
export class PageLayoutComponent implements OnInit {
  @Input() header: string = 'HEADER';

  @Input() loading: boolean = false;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
