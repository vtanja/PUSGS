import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesEditComponent } from './offices-edit.component';

describe('OfficesEditComponent', () => {
  let component: OfficesEditComponent;
  let fixture: ComponentFixture<OfficesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
