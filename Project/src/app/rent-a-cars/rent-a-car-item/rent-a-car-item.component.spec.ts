import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarItemComponent } from './rent-a-car-item.component';

describe('RentACarItemComponent', () => {
  let component: RentACarItemComponent;
  let fixture: ComponentFixture<RentACarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
