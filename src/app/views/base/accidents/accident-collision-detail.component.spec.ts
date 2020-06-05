import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCollisionDetailComponent } from './accident-collision-detail.component';

describe('AccidentCollisionDetailComponent', () => {
  let component: AccidentCollisionDetailComponent;
  let fixture: ComponentFixture<AccidentCollisionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentCollisionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentCollisionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
