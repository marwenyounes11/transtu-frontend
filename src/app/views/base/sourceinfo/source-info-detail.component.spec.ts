import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInfoDetailComponent } from './source-info-detail.component';

describe('SourceInfoDetailComponent', () => {
  let component: SourceInfoDetailComponent;
  let fixture: ComponentFixture<SourceInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
