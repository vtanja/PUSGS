import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightListComponent } from './admin-flight-list.component';

describe('AdminFlightListComponent', () => {
  let component: AdminFlightListComponent;
  let fixture: ComponentFixture<AdminFlightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFlightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
