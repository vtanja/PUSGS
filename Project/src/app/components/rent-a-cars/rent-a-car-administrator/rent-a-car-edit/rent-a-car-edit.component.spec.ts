import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEditComponent } from './rent-a-car-edit.component';

describe('RentACarEditComponent', () => {
  let component: RentACarEditComponent;
  let fixture: ComponentFixture<RentACarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
