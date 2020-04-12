import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfficesComponent } from './profile-offices.component';

describe('CarProfileOfficesComponent', () => {
  let component: ProfileOfficesComponent;
  let fixture: ComponentFixture<ProfileOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
