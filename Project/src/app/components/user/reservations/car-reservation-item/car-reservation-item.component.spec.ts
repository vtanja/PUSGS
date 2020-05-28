import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationItemComponent } from './car-reservation-item.component';

describe('CarReservationItemComponent', () => {
  let component: CarReservationItemComponent;
  let fixture: ComponentFixture<CarReservationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarReservationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
