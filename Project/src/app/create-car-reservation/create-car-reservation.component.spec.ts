import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarReservationComponent } from './create-car-reservation.component';

describe('CreateCarReservationComponent', () => {
  let component: CreateCarReservationComponent;
  let fixture: ComponentFixture<CreateCarReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
