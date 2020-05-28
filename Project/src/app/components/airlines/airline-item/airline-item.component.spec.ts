import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineItemComponent } from './airline-item.component';

describe('AirlineItemComponent', () => {
  let component: AirlineItemComponent;
  let fixture: ComponentFixture<AirlineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
