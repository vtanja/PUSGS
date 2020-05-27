import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddComponent } from './rent-a-car-add.component';

describe('RentACarAddComponent', () => {
  let component: RentACarAddComponent;
  let fixture: ComponentFixture<RentACarAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
