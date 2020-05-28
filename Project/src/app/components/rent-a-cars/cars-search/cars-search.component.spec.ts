import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSearchComponent } from './cars-search.component';

describe('CarsSearchComponent', () => {
  let component: CarsSearchComponent;
  let fixture: ComponentFixture<CarsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
