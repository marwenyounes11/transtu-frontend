import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementDetailComponent } from './departement-detail.component';

describe('DepartementDetailComponent', () => {
  let component: DepartementDetailComponent;
  let fixture: ComponentFixture<DepartementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
