import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataEditComponent } from './main-data-edit.component';

describe('MainDataEditComponent', () => {
  let component: MainDataEditComponent;
  let fixture: ComponentFixture<MainDataEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
