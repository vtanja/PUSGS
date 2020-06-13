import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineMonthlyIncomesComponent } from './airline-monthly-incomes.component';

describe('AirlineMonthlyIncomesComponent', () => {
  let component: AirlineMonthlyIncomesComponent;
  let fixture: ComponentFixture<AirlineMonthlyIncomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineMonthlyIncomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineMonthlyIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
