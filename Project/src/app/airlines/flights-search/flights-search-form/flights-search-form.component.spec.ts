import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSerachFormComponent } from './flights-search-form.component';

describe('FlightsSerachFormComponent', () => {
  let component: FlightsSerachFormComponent;
  let fixture: ComponentFixture<FlightsSerachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsSerachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsSerachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
