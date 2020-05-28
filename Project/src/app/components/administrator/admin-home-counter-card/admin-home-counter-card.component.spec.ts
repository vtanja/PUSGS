import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeCounterCardComponent } from './admin-home-counter-card.component';

describe('AdminHomeCounterCardComponent', () => {
  let component: AdminHomeCounterCardComponent;
  let fixture: ComponentFixture<AdminHomeCounterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeCounterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeCounterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
