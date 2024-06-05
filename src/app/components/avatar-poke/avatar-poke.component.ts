import { Component, Input, OnInit } from '@angular/core';
import { POKE_API_URL } from '../../enums/api.enum';
import { environment } from '../../../environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'tt-avatar-poke',
  templateUrl: './avatar-poke.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ]
})
export class AvatarPokeComponent implements OnInit {
  @Input({required: true}) id: string = '';
  @Input() name: string = '';
  @Input() width: string = '50';
  @Input() height: string = '50';

  avatarUrl: string = '';

  constructor() { }

  ngOnInit() {
    this.parseAvatarUrl();
  }

  parseAvatarUrl() {
    const apiUrl = environment.API_URL + POKE_API_URL['GET_SPRITE'].url;
    this.avatarUrl = apiUrl.replace(':id', this.id);
  }

}
