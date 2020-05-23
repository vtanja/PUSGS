import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminsComponent } from './airline-admins.component';

describe('AirlineAdminsComponent', () => {
  let component: AirlineAdminsComponent;
  let fixture: ComponentFixture<AirlineAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
