import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSearchFormComponent } from './cars-search-form.component';

describe('CarsSearchFormComponent', () => {
  let component: CarsSearchFormComponent;
  let fixture: ComponentFixture<CarsSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
