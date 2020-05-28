import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdministratorComponent } from './airline-administrator.component';

describe('AirlineAdministratorComponent', () => {
  let component: AirlineAdministratorComponent;
  let fixture: ComponentFixture<AirlineAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
