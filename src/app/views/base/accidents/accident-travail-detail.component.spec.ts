import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentTravailDetailComponent } from './accident-travail-detail.component';

describe('AccidentTravailDetailComponent', () => {
  let component: AccidentTravailDetailComponent;
  let fixture: ComponentFixture<AccidentTravailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentTravailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentTravailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
