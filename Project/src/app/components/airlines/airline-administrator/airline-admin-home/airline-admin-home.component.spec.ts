import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminHomeComponent } from './airline-admin-home.component';

describe('AirlineAdminHomeComponent', () => {
  let component: AirlineAdminHomeComponent;
  let fixture: ComponentFixture<AirlineAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
