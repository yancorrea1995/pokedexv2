import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpokemonsComponent } from './findpokemons.component';

describe('FindpokemonsComponent', () => {
  let component: FindpokemonsComponent;
  let fixture: ComponentFixture<FindpokemonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindpokemonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
