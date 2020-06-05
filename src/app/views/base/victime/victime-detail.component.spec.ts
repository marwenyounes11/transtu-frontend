import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictimeDetailComponent } from './victime-detail.component';

describe('VictimeDetailComponent', () => {
  let component: VictimeDetailComponent;
  let fixture: ComponentFixture<VictimeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VictimeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
