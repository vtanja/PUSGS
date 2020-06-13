import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineChartBarComponent } from './airline-chart-bar.component';

describe('AirlineChartBarComponent', () => {
  let component: AirlineChartBarComponent;
  let fixture: ComponentFixture<AirlineChartBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineChartBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
