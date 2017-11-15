import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolesComponent } from './holes.component';

describe('HolesComponent', () => {
  let component: HolesComponent;
  let fixture: ComponentFixture<HolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
