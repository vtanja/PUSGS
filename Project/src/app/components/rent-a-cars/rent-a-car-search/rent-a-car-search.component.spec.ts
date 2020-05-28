import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarSearchComponent } from './rent-a-car-search.component';

describe('RentACarSearchComponent', () => {
  let component: RentACarSearchComponent;
  let fixture: ComponentFixture<RentACarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
