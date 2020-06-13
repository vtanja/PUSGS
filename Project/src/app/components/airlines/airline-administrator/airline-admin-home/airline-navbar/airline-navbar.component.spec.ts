import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineNavbarComponent } from './airline-navbar.component';

describe('AirlineNavbarComponent', () => {
  let component: AirlineNavbarComponent;
  let fixture: ComponentFixture<AirlineNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
