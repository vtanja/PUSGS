import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarListComponent } from './rent-a-car-list.component';

describe('RentACarListComponent', () => {
  let component: RentACarListComponent;
  let fixture: ComponentFixture<RentACarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
