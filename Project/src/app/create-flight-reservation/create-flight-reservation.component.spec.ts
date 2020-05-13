import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlightReservationComponent } from './create-flight-reservation.component';

describe('CreateFlightReservationComponent', () => {
  let component: CreateFlightReservationComponent;
  let fixture: ComponentFixture<CreateFlightReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlightReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlightReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
