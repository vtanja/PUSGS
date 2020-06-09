import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarHomeComponent } from './rent-a-car-home.component';

describe('RentACarHomeComponent', () => {
  let component: RentACarHomeComponent;
  let fixture: ComponentFixture<RentACarHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
