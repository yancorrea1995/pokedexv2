import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypokedexComponent } from './mypokedex.component';

describe('MypokedexComponent', () => {
  let component: MypokedexComponent;
  let fixture: ComponentFixture<MypokedexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypokedexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
