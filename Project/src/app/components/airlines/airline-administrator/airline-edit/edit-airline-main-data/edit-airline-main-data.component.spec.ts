import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirlineMainDataComponent } from './edit-airline-main-data.component';

describe('EditAirlineMainDataComponent', () => {
  let component: EditAirlineMainDataComponent;
  let fixture: ComponentFixture<EditAirlineMainDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAirlineMainDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAirlineMainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
