import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProfileNavbarComponent } from './car-profile-navbar.component';

describe('CarProfileNavbarComponent', () => {
  let component: CarProfileNavbarComponent;
  let fixture: ComponentFixture<CarProfileNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarProfileNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
