import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsCarouselComponent } from './cars-carousel.component';

describe('CarsCarouselComponent', () => {
  let component: CarsCarouselComponent;
  let fixture: ComponentFixture<CarsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
