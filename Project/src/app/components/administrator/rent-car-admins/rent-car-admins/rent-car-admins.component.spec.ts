import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarAdminsComponent } from './rent-car-admins.component';

describe('RentCarAdminsComponent', () => {
  let component: RentCarAdminsComponent;
  let fixture: ComponentFixture<RentCarAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentCarAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
