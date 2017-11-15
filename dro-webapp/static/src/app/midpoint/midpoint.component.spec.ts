import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidpointComponent } from './midpoint.component';

describe('MidpointComponent', () => {
  let component: MidpointComponent;
  let fixture: ComponentFixture<MidpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
