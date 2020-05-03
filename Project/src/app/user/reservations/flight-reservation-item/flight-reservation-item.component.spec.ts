import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReservationItemComponent } from './flight-reservation-item.component';

describe('FlightReservationItemComponent', () => {
  let component: FlightReservationItemComponent;
  let fixture: ComponentFixture<FlightReservationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightReservationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
