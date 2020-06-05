import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentRouteDetailComponent } from './accident-route-detail.component';

describe('AccidentRouteDetailComponent', () => {
  let component: AccidentRouteDetailComponent;
  let fixture: ComponentFixture<AccidentRouteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentRouteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentRouteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
