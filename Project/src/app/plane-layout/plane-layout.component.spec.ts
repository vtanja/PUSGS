import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneLayoutComponent } from './plane-layout.component';

describe('PlaneLayoutComponent', () => {
  let component: PlaneLayoutComponent;
  let fixture: ComponentFixture<PlaneLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
