import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsEditComponent } from './cars-edit.component';

describe('CarsEditComponent', () => {
  let component: CarsEditComponent;
  let fixture: ComponentFixture<CarsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
