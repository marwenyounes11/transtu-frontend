import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplacementDetailComponent } from './emplacement-detail.component';

describe('EmplacementDetailComponent', () => {
  let component: EmplacementDetailComponent;
  let fixture: ComponentFixture<EmplacementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplacementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplacementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
