import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAdministratorComponent } from './rent-a-car-administrator.component';

describe('RentACarAdministratorComponent', () => {
  let component: RentACarAdministratorComponent;
  let fixture: ComponentFixture<RentACarAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
