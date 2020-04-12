import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProfileOfficesComponent } from './car-profile-offices.component';

describe('CarProfileOfficesComponent', () => {
  let component: CarProfileOfficesComponent;
  let fixture: ComponentFixture<CarProfileOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarProfileOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarProfileOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
