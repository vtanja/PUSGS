import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFlightItemComponent } from './round-flight-item.component';

describe('RoundFlightItemComponent', () => {
  let component: RoundFlightItemComponent;
  let fixture: ComponentFixture<RoundFlightItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFlightItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFlightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
