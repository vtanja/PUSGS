import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAnnualIncomesComponent } from './airline-annual-incomes.component';

describe('AirlineAnnualIncomesComponent', () => {
  let component: AirlineAnnualIncomesComponent;
  let fixture: ComponentFixture<AirlineAnnualIncomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAnnualIncomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAnnualIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
