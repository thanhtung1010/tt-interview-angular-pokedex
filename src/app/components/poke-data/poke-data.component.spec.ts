/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PokeDataComponent } from './poke-data.component';

describe('PokeDataComponent', () => {
  let component: PokeDataComponent;
  let fixture: ComponentFixture<PokeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
